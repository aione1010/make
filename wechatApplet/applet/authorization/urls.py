from django.urls import path
from . import views
urlpatterns = [
    path('authorize', views.authorize, name='authorize'),
    path('user', views.UserView.as_view()),
    path('logout', views.logout)
]
