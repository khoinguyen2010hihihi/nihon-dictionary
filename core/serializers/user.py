# core/serializers/user.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Nếu bạn KHÔNG có field 'role' trong model, bỏ 'role' khỏi list
        fields = ["id", "username", "email", "first_name", "last_name", "role"]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        # Nếu không có 'role', bỏ đi
        fields = ["username", "email", "password", "first_name", "last_name", "role"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)  # quan trọng
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Đăng nhập: trả access/refresh + thông tin user."""
    def validate(self, attrs):
        data = super().validate(attrs)  # có 'access' và 'refresh'
        data["user"] = UserPublicSerializer(self.user).data
        return data
