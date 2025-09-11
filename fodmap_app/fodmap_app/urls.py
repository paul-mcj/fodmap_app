from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Blogs & Posts (nested)
    path("api/", include("blogs.urls")),

    # Users, Foods, Journals
    path("api/users/", include("users.urls")),
    path("api/foods/", include("foods.urls")),
    path("api/journals/", include("journals.urls")),
]
