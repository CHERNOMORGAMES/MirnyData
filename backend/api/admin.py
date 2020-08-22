from django.contrib import admin

from api import models


class UserAdmin(admin.ModelAdmin):
    model = models.User
    list_display = ('email', 'type', 'is_staff', 'is_superuser')


class TeamAdmin(admin.ModelAdmin):
    model = models.Team
    list_display = ('name', 'city')


class PlayerAdmn(admin.ModelAdmin):
    model = models.Player
    list_display = ('name', 'age', 'team', 'position', 'number')


class EventAdmin(admin.ModelAdmin):
    model = models.Event
    list_display = ('name', 'type', 'date', 'duration', 'info', 'address', 'team', 'image')


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Team, TeamAdmin)
admin.site.register(models.Event, EventAdmin)
admin.site.register(models.Review)
admin.site.register(models.Initiative)
admin.site.register(models.Comment)
admin.site.register(models.Notification)
