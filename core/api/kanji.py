from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from core.services.kanji import fetch_kanji_detail

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def kanji_detail(request, char: str):
    try:
        data = fetch_kanji_detail(char)
    except Exception as e:
        return Response({"detail": str(e)}, status=502)

    out = {
        "kanji": data.get("kanji"),
        "meanings": data.get("meanings", []),
        "on_readings": data.get("on_readings", []),
        "kun_readings": data.get("kun_readings", []),
        "jlpt": data.get("jlpt"),
        "grade": data.get("grade"),
    }
    return Response(out)
