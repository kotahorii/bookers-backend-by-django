from django.db import models
from django.contrib.auth.models import User
import uuid


def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.user_profile.id) + str('.') + str(ext)])


def upload_book_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['posts', str(instance.user_profile.id) + str('.') + str(ext)])


class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    user_profile = models.OneToOneField(
        User, related_name='user_profile',
        on_delete=models.CASCADE
    )
    img = models.ImageField(blank=True, null=True,
                            upload_to=upload_avatar_path)
    introduction = models.CharField(max_length=140)

    def __str__(self):
        return self.user_profile.username


class Book(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=50)
    body = models.CharField(max_length=140)
    reader = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='reader')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    book_image = models.ImageField(
        blank=True, null=True, upload_to=upload_book_path)

    def __str__(self):
        return self.title
