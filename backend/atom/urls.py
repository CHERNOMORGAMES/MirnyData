from django.contrib import admin
from django.urls import path
from django.views.generic import RedirectView
from api import views as v

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', v.DashboardView.as_view(), name='dashboard'),
    path('', RedirectView.as_view(url='dashboard/'), name='index'),
    path('teams/', v.TeamsView.as_view(), name='teams'),
    path('initiatives/', v.InitiativesView.as_view(), name='initiatives'),
    path('cabinet/<int:pk>/', v.CabinetView.as_view(), name='cabinet'),
    path('notifications/', v.NotificationsView.as_view(), name='notifications'),

]
