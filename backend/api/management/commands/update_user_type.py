from django.core.management.base import BaseCommand, CommandError
from api.models import User

class Command(BaseCommand):
    help = "Update users' type once per day."

    def handle(self, *args, **options):
        for user in User.objects.filter(type__lt=10):
            # check conditions
            if False:
                user.type += 1
                user.save()
        self.stdout.write(self.style.SUCCESS('Successfully updated user types.'))