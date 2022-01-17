from django.urls import path
from base.views import user_views as views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/OTP', views.WithOTPTokenObtainPairView.as_view(), name='token_obtain_pair_with_OTP'),
    path('login/refresh/', views.MyTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.getUserProfile, name='users-profile'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('profile/update/', views.ChangePasswordView.as_view(), name='user-profile-update'),
    path('address/', views.getShippingAddress, name='users-address')
]