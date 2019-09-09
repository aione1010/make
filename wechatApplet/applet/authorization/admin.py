from django.contrib import admin

# Register your models here.
from authorization.models import User
admin.site.register(User)