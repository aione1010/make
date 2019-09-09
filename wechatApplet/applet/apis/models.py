from django.db import models

# Create your models here.


class Activity(models.Model):
    # 主键
    activity_id = models.CharField(max_length=32, unique=True, default='')
    # 活动名称
    activity_name = models.CharField(max_length=256, default='')
    # 活动开始时间
    begindate = models.TextField(default='')
    # 活动结束时间
    enddate = models.TextField(default='')
    # 参加活动部门
    institution = models.TextField(default='[]')
    # 活动纪要
    minutes = models.TextField(default='')
    # 参与活动人员
    name = models.TextField(default='[]')
    # 保存的图片
    pics = models.TextField(default='[]')
    # 图片经纬度信息
    picInfo = models.TextField(default='{}')
    # 专项组
    item = models.TextField(default='')
    # 项目组
    project = models.TextField(default='')

    class Meta:
        indexes = [
            models.Index(
                fields=["activity_id", "activity_name", "begindate", "pics"])
        ]

    def to_dict(self):
        return {
            "activity_id": self.activity_id,
            "begindate": self.begindate,
            "enddate": self.enddate,
            "activity_name": self.activity_name,
            "institution": self.institution,
            "minutes": self.minutes,
            "name": self.name,
            "picInfo": self.picInfo,
            "item": self.item,
            "project": self.project,
            "pics": self.pics
        }

    def __str__(self):
        return str(self.to_dict())

    def __repr__(self):
        return str(self.to_dict())
