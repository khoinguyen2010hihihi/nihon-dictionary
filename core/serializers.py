from rest_framework import serializers
from .models import Word, WordMeaning, Favorite, Flashcard, FlashcardWord
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class WordMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordMeaning
        fields = ["id","meaning","example_sentence"]

class WordSerializer(serializers.ModelSerializer):
    meanings = WordMeaningSerializer(many=True, read_only=True)
    class Meta:
        model = Word
        fields = ["id","kanji","kana","parts_of_speech","jlpt_level","is_cached","meanings"]

class FavoriteSerializer(serializers.ModelSerializer):
    word = WordSerializer(read_only=True)
    class Meta:
        model = Favorite
        fields = ["id","word"]

class FlashcardWordSerializer(serializers.ModelSerializer):
    word = WordSerializer(read_only=True)
    class Meta:
        model = FlashcardWord
        fields = ["id","word"]

class FlashcardSerializer(serializers.ModelSerializer):
    items = FlashcardWordSerializer(many=True, read_only=True)
    class Meta:
        model = Flashcard
        fields = ["id","name","created_at","items"]

class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "date_joined"]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, trim_whitespace=False)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]  # role mặc định 'user' ở model

    def validate_password(self, value):
        # dùng validators mặc định của Django (độ dài, số/chữ, v.v. nếu bạn cấu hình)
        validate_password(value)
        return value

    def validate_email(self, value):
        # Email là tuỳ chọn; nếu bạn muốn bắt buộc thì thêm required=True
        if value and User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email đã được sử dụng.")
        return value

    def create(self, validated_data):
        # dùng create_user để tự hash password + set mặc định
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        return user