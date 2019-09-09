from django.db import models
from apis.models import Activity
# Create your models here.


class User(models.Model):

    # openid
    open_id = models.CharField(max_length=32, unique=True)
    # 昵称
    nickname = models.CharField(max_length=256)

    activity = models.ManyToManyField(Activity)

    class Meta:
        indexes = [models.Index(fields=["open_id", "nickname"])]
