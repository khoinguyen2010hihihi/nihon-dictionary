# core/api/auth.py  (hoặc core/views/auth.py)
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from core.serializers.user import (
    RegisterSerializer,
    UserPublicSerializer,
    CustomTokenObtainPairSerializer,
)

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        s = RegisterSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        user = s.save()
        # Nếu muốn đăng ký xong KHÔNG login ngay, có thể bỏ phần token
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserPublicSerializer(user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)

class LoginView(TokenObtainPairView):
    """POST: {username, password} -> {access, refresh, user}"""
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer

@api_view(["GET"])
@permission_classes([permissions.AllowAny])  # hoặc bỏ dòng này để yêu cầu login
def ping(request):
    return Response({"status": "ok"})

@api_view(["GET"])
def me(request):
    if not request.user.is_authenticated:
        return Response(status=401)
    return Response(UserPublicSerializer(request.user).data)


@api_view(["GET"])
def me(request):
    if not request.user.is_authenticated:
        return Response(status=401)
    return Response(UserPublicSerializer(request.user).data)
