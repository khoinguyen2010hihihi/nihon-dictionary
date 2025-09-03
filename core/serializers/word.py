from rest_framework import serializers
from core.models import Word, WordMeaning

class WordMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordMeaning
        fields = ["id","meaning","example_sentence"]

class WordSerializer(serializers.ModelSerializer):
    meanings = WordMeaningSerializer(many=True, read_only=True)
    class Meta:
        model = Word
        fields = ["id","kanji","kana","parts_of_speech","jlpt_level","is_cached","meanings"]