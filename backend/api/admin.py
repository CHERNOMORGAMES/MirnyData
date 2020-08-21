from django.contrib import admin

from backend.api import models

admin.site.register(models.User)
admin.site.register(models.Team)
admin.site.register(models.Event)
admin.site.register(models.Review)
admin.site.register(models.Comment)
admin.site.register(models.Initiative)
