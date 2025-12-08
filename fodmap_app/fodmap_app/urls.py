from django.conf import settings
from django.conf.urls.static import static
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

# FIXME: Serve media files during development -- needs to change when deploying to production
if settings.DEBUG:  
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)