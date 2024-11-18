from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Административная панель
    path('admin/', admin.site.urls),

    # Подключение маршрутов из приложения `tasks`
    path('api/', include('tasks.urls')),

    # Маршруты для получения и обновления JWT-токенов
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
