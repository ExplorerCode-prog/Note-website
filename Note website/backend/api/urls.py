from django.urls import path, include
from . import views

urlpatterns=[
    path('notes/', views.ListNoteApi.as_view(), name='notes-create'),
    path('notes/delete/<int:pk>/', views.DeleteNote.as_view(), name='delete'),
    
]