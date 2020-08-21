from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.model(email=email)
        user.set_password(password)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    TYPES = [
        ('Admin', 'Admin'),
        ('Owner', 'Owner'),
        ('Fanat', 'Fanat'),
        ('Hooligun', 'Hooligun')
    ]
    username = models.CharField(max_length=128, blank=True, null=True, default='')
    email = models.EmailField(null=False, unique=True)
    type = models.CharField(max_length=32, choices=TYPES, default='Hooligun')
    created_at = models.DateTimeField(auto_now_add=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Team(models.Model):
    name = models.CharField(max_length=256)
    city = models.CharField(max_length=128)
    users = models.ManyToManyField(User, related_name='teams')

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=256)
    date = models.DateTimeField()
    duration = models.CharField(max_length=1024, blank=True)
    info = models.CharField(max_length=1024, blank=True)
    address = models.CharField(max_length=512)
    team = models.ForeignKey(Team, null=True, on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='events')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class EventLike(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


class ReviewLike(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    text = models.CharField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)


class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Initiative(models.Model):
    STATUSES = [
        ('Initiated', 'Initiated'),
        ('Approved', 'Approved'),
        ('Declined', 'Declined'),
        ('Closed', 'Closed')
    ]
    text = models.CharField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    status = models.CharField(max_length=32, choices=STATUSES)
    created_at = models.DateTimeField(auto_now_add=True)


class InitiativeLike(models.Model):
    initiative = models.ForeignKey(Initiative, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
