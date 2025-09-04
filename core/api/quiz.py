# core/api/quiz.py
import random
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from django.db.models import Prefetch, Q
from core.models import Word, WordMeaning, Favorite, FlashcardWord

def meaning_of(word: Word) -> str:
    m = word.meanings.first()
    return (m.meaning or "").strip() if m else ""

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def mcq_quiz(request):
    """
    GET /api/quiz/mcq/?count=10&mode=meaning_to_word&level=N5&source=all|favorites|deck&deck_id=1
    """
    count = int(request.query_params.get("count", 10))
    level = request.query_params.get("level")
    mode = request.query_params.get("mode", "meaning_to_word")
    source = request.query_params.get("source", "all")
    deck_id = request.query_params.get("deck_id")

    base_qs = Word.objects.all().prefetch_related(
        Prefetch("meanings", queryset=WordMeaning.objects.all())
    )

    # Lọc theo nguồn
    if source == "favorites" and request.user.is_authenticated:
        fav_ids = Favorite.objects.filter(user=request.user).values_list("word_id", flat=True)
        base_qs = base_qs.filter(id__in=fav_ids)
    elif source == "deck" and deck_id:
        deck_ids = FlashcardWord.objects.filter(flashcard_id=deck_id).values_list("word_id", flat=True)
        base_qs = base_qs.filter(id__in=deck_ids)

    # Lọc JLPT (nếu truyền)
    if level:
        l = level.upper()
        if not l.startswith("N"): l = "N" + l
        base_qs = base_qs.filter(jlpt_level=l)

    # Loại bỏ từ thiếu nghĩa
    base_qs = base_qs.filter(meanings__isnull=False).distinct()

    words = list(base_qs[:3000])  # giới hạn để random nhẹ
    words = [w for w in words if meaning_of(w)]  # có nghĩa hợp lệ

    if len(words) < 4:
        return Response({"detail": "Not enough words to generate quiz."}, status=400)

    random.shuffle(words)
    questions = []
    pool = words.copy()

    def label_word(w: Word) -> str:
        return (w.kanji or w.kana or "").strip()

    for _ in range(min(count, len(words) // 4)):
        correct = pool.pop()
        # Chọn 3 nhiễu khác biệt
        distractors = random.sample([w for w in words if w.id != correct.id], 3)

        if mode == "word_to_meaning":
            prompt = label_word(correct)
            choices = [meaning_of(correct)] + [meaning_of(w) for w in distractors]
        else:  # meaning_to_word
            prompt = meaning_of(correct)
            choices = [label_word(correct)] + [label_word(w) for w in distractors]

        # Xáo thứ tự giữ đúng chỉ số
        idx = list(range(4)); random.shuffle(idx)
        shuffled = [choices[i] for i in idx]
        correct_index = idx.index(0)

        questions.append({
            "prompt": prompt,
            "choices": shuffled,
            "correct_index": correct_index,
            "answer_word": {"id": correct.id, "kanji": correct.kanji, "kana": correct.kana}
        })

    return Response({"mode": mode, "level": level, "source": source, "count": len(questions), "questions": questions})
