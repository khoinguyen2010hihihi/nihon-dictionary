from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q

from core.models import Word, WordMeaning, ExampleSentence
from core.serializers.word import WordSerializer
from core.services.ingest import upsert_from_jisho
from django.db.models import Prefetch

class SearchView(generics.ListAPIView):
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        q = (self.request.query_params.get("q") or "").strip()
        if not q:
            return Word.objects.none()

        base = Word.objects.all().prefetch_related(
            Prefetch(
                "meanings",
                queryset=WordMeaning.objects.all().prefetch_related("examples")
            )
        )

        qs = base.filter(Q(kanji__icontains=q) | Q(kana__icontains=q))
        if qs.exists():
            return qs

        words = upsert_from_jisho(q)
        return base.filter(id__in=[w.id for w in words])

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def autocomplete(request):
    q = request.query_params.get("q", "")
    if not q:
        return Response([])
    qs = Word.objects.filter(Q(kanji__icontains=q) | Q(kana__icontains=q)).values("id", "kanji", "kana")[:10]
    return Response(list(qs))

class ReverseLookupView(generics.ListAPIView):
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        q = (self.request.query_params.get("q") or "").strip()
        if not q:
            return Word.objects.none()
        ids = list(Word.objects.filter(meanings__meaning__icontains=q).values_list("id", flat=True).distinct())
        if ids:
            return Word.objects.filter(id__in=ids)
        words = upsert_from_jisho(q)
        return Word.objects.filter(id__in=[w.id for w in words])
