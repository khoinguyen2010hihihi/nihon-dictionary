from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from core.services.tatoeba import search_examples
from core.models import Word

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def examples(request):
    q = (request.query_params.get("q") or "").strip()
    limit = int(request.query_params.get("limit", 5))
    if not q:
        return Response([])
    try:
        data = search_examples(q, limit=limit)
        return Response({"query": q, "count": len(data), "examples": data})
    except Exception as e:
        return Response({"detail": str(e)}, status=502)

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def word_examples(request, word_id: int):
    limit = int(request.query_params.get("limit", 5))
    try:
        w = Word.objects.only("kanji", "kana").get(pk=word_id)
    except Word.DoesNotExist:
        return Response({"detail": "word not found"}, status=404)

    key = w.kanji or w.kana
    try:
        data = search_examples(key, limit=limit)
        return Response({"word_id": w.id, "key": key, "count": len(data), "examples": data})
    except Exception as e:
        return Response({"detail": str(e)}, status=502)
