from django.shortcuts import render
from django.views.generic import ListView, DetailView
from api.models import Event, Team, Initiative, User, Notification


class DashboardView(ListView):
    queryset = Event.objects.all()

    def get_context_data(self):
        context = {
            'events': self.queryset
        }
        return context


class TeamsView(ListView):
    queryset = Team.objects.all()


class InitiativesView(ListView):
    queryset = Initiative.objects.all()


class CabinetView(DetailView):
    model = User


class NotificationsView(ListView):
    queryset = Notification.objects.all()
