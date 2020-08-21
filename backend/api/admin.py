from django.contrib import admin

from api import models


class UserAdmin(admin.ModelAdmin):
    model = models.User
    list_display = ('email', 'type', 'is_staff', 'is_superuser')


admin.site.register(models.User)
admin.site.register(models.Team)
admin.site.register(models.Event)
admin.site.register(models.Review)
admin.site.register(models.Initiative)
admin.site.register(models.Comment)
admin.site.register(models.Notification)
