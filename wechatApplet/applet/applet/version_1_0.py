from django.urls import path, include

urlpatterns = [
    path('auth/', include('authorization.urls')),
    path('service/', include('apis.urls'))
]
