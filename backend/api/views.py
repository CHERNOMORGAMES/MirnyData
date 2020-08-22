from django.shortcuts import render
from django.views import View
from django.views.generic import ListView, DetailView
from api.models import Event, Team, Initiative, User, Notification, Player, EventPlayer
from django.utils import timezone


class DashboardView(ListView):
    queryset = Event.objects.all()

    def get_context_data(self):
        context = {
            'events': self.queryset,
            'now': timezone.now()
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


class EstimateTeam(View):
    template_name = 'api/event_detail.html'

    def get_queryset(self):
        queryset = EventPlayer.objects.filter(event__id=self.kwargs['pk'])
        return queryset

    def get(self, request, *args, **kwargs):
        context = {

        }
        return render(request, self.template_name, context)

