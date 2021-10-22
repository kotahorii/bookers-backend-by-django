from django.db import models
from rest_framework import serializers
from .models import Profile, Book
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user_profile_username = serializers.ReadOnlyField(
        source='user_profile.username', read_only=True
    )

    class Meta:
        model = Profile
        fields = ['id', 'user_profile', 'img',
                  'introduction', 'user_profile_username']
        extra_kwargs = {'user_profile': {'read_only': True}}


class BookSerializer(serializers.ModelSerializer):
    reader_username = serializers.ReadOnlyField(
        source='reader.username', read_only=True)
    created_at = serializers.DateTimeField(
        format='%Y-%m-%d %H:%M', read_only=True)
    updated_at = serializers.DateTimeField(
        format='%Y-%m-%d %H:%M', read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'body', 'reader', 'reader_username',
                  'created_at', 'updated_at', 'book_image']
        extra_kwargs = {'reader': {'read_only': True}}
