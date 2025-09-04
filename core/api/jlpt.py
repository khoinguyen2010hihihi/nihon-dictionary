from rest_framework import generics, permissions
from core.models import Word
from core.serializers.word import WordSerializer

class JLPTWordListView(generics.ListAPIView):
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        level = (self.kwargs.get("level") or "").upper()

        if level.startswith("JLPT-"): level = level.split("-",1)[1].upper()
        if level and not level.startswith("N"):
            level = "N" + level
        return Word.objects.filter(jlpt_level=level).order_by("kana","kanji")
