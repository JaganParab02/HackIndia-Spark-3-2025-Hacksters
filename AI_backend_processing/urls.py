from django.urls import path
from .views import extract_text_view

urlpatterns = [
    path("extract-text/", extract_text_view, name="extract-text"),
]
