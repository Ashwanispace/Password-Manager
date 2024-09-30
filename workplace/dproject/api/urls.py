from . import views
from django.urls import path

urlpatterns = [
    path('read',views.read),
    path('create',views.create),
    path('delete/<uuid:id>',views.delete),
    path('login',views.login_view),
    path('logout',views.logout_view),
    path('signup',views.signup_view),
    path('check-auth', views.check_login_status),
]