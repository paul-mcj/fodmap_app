from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser

# add these custom fields to admin dashboard for easier testing
class CustomUserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Additional Info", {'fields': ('bio', 'profile_image')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ("Additional Info", {'fields': ('bio', 'profile_image')}),
    )
    # TODO: later add the profile_image
    list_display = BaseUserAdmin.list_display + ('bio',)

admin.site.register(CustomUser, CustomUserAdmin)