from rest_framework import status, permissions, generics, viewsets
from .models import Profile, Book
from .serializers import UserSerializer, ProfileSerializer, BookSerializer
from django.contrib.auth.models import User
from . import custompermissions


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,
                          custompermissions.ProfilePermission)

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(user_profile=self.request.user)


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (permissions.IsAuthenticated,
                          custompermissions.ReaderPermission)

    def perform_create(self, serializer):
        serializer.save(reader=self.request.user)
