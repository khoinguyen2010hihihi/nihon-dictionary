from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q
from .models import Word, Favorite, Flashcard, FlashcardWord, SearchHistory
from .serializers import WordSerializer, FavoriteSerializer, FlashcardSerializer
from .services.ingest import upsert_from_jisho
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserPublicSerializer

User = get_user_model()

class SearchView(generics.ListAPIView):
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        q = self.request.query_params.get("q","").strip()
        if not q: return Word.objects.none()
        # autocomplete (kanji/kana LIKE) nếu ký tự Nhật
        qs = Word.objects.filter(Q(kanji__icontains=q) | Q(kana__icontains=q))
        if qs.exists():
            return qs
        # cache miss -> gọi Jisho, ingest rồi trả kết quả
        words = upsert_from_jisho(q)
        return Word.objects.filter(id__in=[w.id for w in words])

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def autocomplete(request):
    q = request.query_params.get("q","")
    if not q:
        return Response([])
    qs = Word.objects.filter(Q(kanji__icontains=q) | Q(kana__icontains=q)).values("id","kanji","kana")[:10]
    return Response(list(qs))

class ReverseLookupView(generics.ListAPIView):
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        q = self.request.query_params.get("q","").strip()
        if not q: return Word.objects.none()
        # Search meanings first
        ids = list(Word.objects.filter(meanings__meaning__icontains=q).values_list("id", flat=True).distinct())
        if ids: return Word.objects.filter(id__in=ids)
        # If not found, fetch from Jisho (supports English keywords)
        words = upsert_from_jisho(q)
        return Word.objects.filter(id__in=[w.id for w in words])

# Lưu lịch sử sau mỗi tra cứu (đơn giản: client gọi endpoint này)
@api_view(["POST"])
def push_history(request):
    user = request.user
    word_id = request.data.get("word_id")
    if not user.is_authenticated: return Response(status=401)
    SearchHistory.objects.create(user=user, word_id=word_id)
    return Response({"ok": True})

@api_view(["GET"])
def history(request):
    if not request.user.is_authenticated: return Response(status=401)
    qs = SearchHistory.objects.filter(user=request.user).order_by("-searched_at")[:50]
    data = [{"word_id": h.word_id, "kanji": getattr(h.word, "kanji", None), "kana": getattr(h.word, "kana", None), "at": h.searched_at} for h in qs]
    return Response(data)

# Favorites
@api_view(["POST"])
def toggle_favorite(request):
    if not request.user.is_authenticated: return Response(status=401)
    word_id = request.data.get("word_id")
    fav, created = Favorite.objects.get_or_create(user=request.user, word_id=word_id)
    if not created:
        fav.delete()
    return Response({"favorited": created})

class FavoritesView(generics.ListAPIView):
    serializer_class = FavoriteSerializer
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

# Flashcards
@api_view(["POST"])
def create_flashcard(request):
    if not request.user.is_authenticated: return Response(status=401)
    name = request.data.get("name","My deck")
    fc = Flashcard.objects.create(user=request.user, name=name)
    return Response({"id": fc.id, "name": fc.name})

@api_view(["POST"])
def add_to_flashcard(request, flashcard_id):
    if not request.user.is_authenticated: return Response(status=401)
    word_id = request.data.get("word_id")
    FlashcardWord.objects.get_or_create(flashcard_id=flashcard_id, word_id=word_id)
    return Response({"ok": True})

class FlashcardDetail(generics.RetrieveAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # cấp JWT ngay sau khi đăng ký
        refresh = RefreshToken.for_user(user)
        data = {
            "user": UserPublicSerializer(user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }
        return Response(data, status=status.HTTP_201_CREATED)

@api_view(["GET"])
def me(request):
    if not request.user.is_authenticated:
        return Response(status=401)
    return Response(UserPublicSerializer(request.user).data)