from django.urls import path
from .views import imageApp, activity
urlpatterns = [
    path('image', imageApp.ImageView.as_view()),
    path('image/list', imageApp.ImageListView.as_view()),
    path('image/submit', imageApp.submit),
    # 活动
    path('activity', activity.create_activity),
    path('institution', activity.InstitutionView.as_view()),
    path('people', activity.PeopleView.as_view()),
    path('minutes', activity.MinutesView.as_view()),
    path('query', activity.query),
]