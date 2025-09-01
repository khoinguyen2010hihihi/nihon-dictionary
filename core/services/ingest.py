from .jisho import jisho_search
from core.models import Word, WordMeaning
from django.db import transaction

def _first(parts): return parts[0] if parts else None

def upsert_from_jisho(keyword: str) -> list[Word]:
    data = jisho_search(keyword)
    words = []
    with transaction.atomic():
        for item in data.get("data", []):
            japanese = _first(item.get("japanese", [])) or {}
            senses = item.get("senses", [])
            jlpt = _first(item.get("jlpt", []))  # e.g., 'jlpt-n5'
            jlpt_level = jlpt.split('-')[-1].upper() if jlpt else None
            pos_list = _first(item.get("parts_of_speech", [])) or (senses[0]["parts_of_speech"][0] if senses and senses[0]["parts_of_speech"] else "")

            w = Word.objects.create(
                kanji=japanese.get("word"),
                kana=japanese.get("reading"),
                parts_of_speech=pos_list,
                jlpt_level=jlpt_level,
                is_cached=True
            )
            for s in senses:
                meaning = "; ".join(s.get("english_definitions", []))
                example = None
                WordMeaning.objects.create(word=w, meaning=meaning, example_sentence=example)
            words.append(w)
    return words
