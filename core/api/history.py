from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.models import SearchHistory

@api_view(["POST"])
def push_history(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=401)
    word_id = request.data.get("word_id")
    if not word_id:
        return Response({"detail": "word_id required"}, status=400)
    SearchHistory.objects.create(user=user, word_id=word_id)
    return Response({"ok": True}, status=201)

@api_view(["GET"])
def history(request):
    if not request.user.is_authenticated:
        return Response(status=401)
    qs = SearchHistory.objects.filter(user=request.user).order_by("-searched_at")[:50]
    data = [
        {"word_id": h.word_id, "kanji": getattr(h.word, "kanji", None), "kana": getattr(h.word, "kana", None), "at": h.searched_at}
        for h in qs
    ]
    return Response(data)
