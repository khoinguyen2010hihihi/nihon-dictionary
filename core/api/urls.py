from django.urls import path
from .search import SearchView, autocomplete, ReverseLookupView
from .history import push_history, history
from .favorites import toggle_favorite, FavoritesView
from .flashcards import create_flashcard, add_to_flashcard, FlashcardDetail
from .auth import RegisterView, me
from .kanji import kanji_detail
from .jlpt import JLPTWordListView
from .quiz import mcq_quiz

urlpatterns = [
    path("search/", SearchView.as_view()),
    path("autocomplete/", autocomplete),
    path("reverse/", ReverseLookupView.as_view()),

    path("history/push/", push_history),
    path("history/", history),

    path("favorites/toggle/", toggle_favorite),
    path("favorites/", FavoritesView.as_view()),

    path("flashcards/", create_flashcard),
    path("flashcards/<int:flashcard_id>/add/", add_to_flashcard),
    path("flashcards/<int:pk>/", FlashcardDetail.as_view()),

    path("auth/register/", RegisterView.as_view()),
    path("auth/me/", me),

    path("kanji/<str:char>/", kanji_detail),
    path("jlpt/<str:level>/words/", JLPTWordListView.as_view()),
    path("jlpt/mcq/", mcq_quiz),
]
