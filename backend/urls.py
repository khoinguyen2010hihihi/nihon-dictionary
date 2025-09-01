from django.contrib import admin
from django.urls import path
from core.views import (
    SearchView,
    ReverseLookupView,
    autocomplete,
    push_history,
    history,
    toggle_favorite,
    FavoritesView,
    create_flashcard,
    add_to_flashcard,
    FlashcardDetail,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import RegisterView, me

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/token/", TokenObtainPairView.as_view()),
    path("api/auth/token/refresh/", TokenRefreshView.as_view()),
    path("api/auth/register/", RegisterView.as_view()),
    path("api/auth/me/", me),

    path("api/search/", SearchView.as_view()),
    path("api/autocomplete/", autocomplete),
    path("api/reverse/", ReverseLookupView.as_view()),
    
    path("api/history/push/", push_history),
    path("api/history/", history),

    path("api/favorites/toggle/", toggle_favorite),
    path("api/favorites/", FavoritesView.as_view()),

    path("api/flashcards/", create_flashcard),
    path("api/flashcards/<int:flashcard_id>/add/", add_to_flashcard),
    path("api/flashcards/<int:pk>/", FlashcardDetail.as_view()),
]
