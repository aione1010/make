from django.http import JsonResponse
from django.views import View
from utils.response import CommonResponseMixin, ReturnCode, wrap_json_response
from utils.auth import already_authorized, get_user
from authorization.models import User
from apis.models import Activity
import hashlib
import json


# 初始化一个模型
def create_activity(request):
    if not already_authorized(request):
        response = wrap_json_response(code=ReturnCode.UNAUTHORIZED)
        return JsonResponse(data=response, safe=False)
    open_id = request.session.get('open_id')
    user = User.objects.get(open_id=open_id)
    received_body = request.body.decode('utf-8')
    # json转换成字典
    received_body = eval(received_body)
    new_activity = Activity()
    activity_name = received_body.get('activityName', '')

    # print(activity_name)
    begindate = received_body.get('begindate', '')
    # print(begindate)
    enddate = received_body.get('enddate', '')
    # print(enddate)
    item = received_body.get('item', '')
    # print(item)
    project = received_body.get('project', '')
    # print(project)
    src = activity_name + begindate + enddate + item + project + open_id
    activity_id = hashlib.md5(src.encode('utf8')).hexdigest()
    # 判断是否已经创建活动,即activity_id是否已经存在
    if len(user.activity.all().filter(
            activity_name=activity_name)) == 1 and len(
                user.activity.all().filter(activity_id=activity_id)) != 1:
        message = "activity_name duplication"
        data = {"activity_name": activity_name}
        response = wrap_json_response(
            data=data, code=ReturnCode.FAILED, message=message)
        # print(response)
        return JsonResponse(data=response, safe=False)
    if len(user.activity.all().filter(activity_id=activity_id)) == 1:
        message = "Activity already exists"
        data = {"activity_id": activity_id}
        response = wrap_json_response(
            data=data, code=ReturnCode.WRONG_PARMAS, message=message)
        # print(response)
        return JsonResponse(data=response, safe=False)
    # print(activity_id)
    new_activity.activity_id = activity_id
    new_activity.activity_name = activity_name
    new_activity.begindate = begindate
    new_activity.enddate = enddate
    new_activity.item = item
    new_activity.project = project
    new_activity.save()
    user.activity.add(new_activity)
    user.save()
    response = {'id': activity_id}
    response = wrap_json_response(data=response, code=ReturnCode.SUCCESS)
    return JsonResponse(data=response, safe=False)


class InstitutionView(View, CommonResponseMixin):

    def get(self, request):
        if not already_authorized(request):
            response = self.wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(response, safe=False)
        open_id = request.session.get('open_id')
        user = User.objects.get(open_id=open_id)
        activity_id = request.GET.get('activity_id')
        print(activity_id)
        institution = user.activity.all().get(
            activity_id=activity_id).to_dict().get('institution')
        institution = json.loads(institution)
        # print(institution)
        response = self.wrap_json_response(
            data=institution, code=ReturnCode.SUCCESS)
        return JsonResponse(response, safe=False)

    def post(self, request):
        if not already_authorized(request):
            response = self.wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(response, safe=False)
        user = get_user(request)
        # 从request中取出request数据
        received_body = request.body.decode('utf-8')
        # json转换成字典
        received_body = eval(received_body)
        institution = received_body.get('institution')
        activity_id = received_body.get('activity_id')
        activity = user.activity.all().get(activity_id=activity_id)
        activity.institution = json.dumps(institution)
        activity.save()
        user.save()
        print(activity)
        response = self.wrap_json_response(code=ReturnCode.SUCCESS)
        return JsonResponse(response, safe=False)


class PeopleView(View, CommonResponseMixin):

    def get(self, request):
        if not already_authorized(request):
            response = self.wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(response, safe=False)
        open_id = request.session.get('open_id')
        user = User.objects.get(open_id=open_id)
        activity_id = request.GET.get('activity_id')
        print(activity_id)
        name = user.activity.all().get(
            activity_id=activity_id).to_dict().get('name')
        name = json.loads(name)
        print(name)
        response = self.wrap_json_response(data=name, code=ReturnCode.SUCCESS)
        return JsonResponse(response, safe=False)

    def post(self, request):
        if not already_authorized(request):
            response = self.wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(response, safe=False)
        user = get_user(request)
        # 从request中取出request数据
        received_body = request.body.decode('utf-8')
        # json转换成字典
        received_body = eval(received_body)
        name = received_body.get('name')
        activity_id = received_body.get('activity_id')
        activity = user.activity.all().get(activity_id=activity_id)
        activity.name = json.dumps(name)
        print(name)
        activity.save()
        user.save()
        print(activity)
        response = self.wrap_json_response(code=ReturnCode.SUCCESS)
        return JsonResponse(response, safe=False)


# 活动纪要的完善
class MinutesView(View, CommonResponseMixin):

    def get(self, request):
        if not already_authorized(request):
            response = self.wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(response, safe=False)
        open_id = request.session.get('open_id')
        user = User.objects.get(open_id=open_id)
        activity_id = request.GET.get('activity_id')
        print(activity_id)
        minutes = user.activity.all().get(
            activity_id=activity_id).to_dict().get('minutes')

        print(minutes)
        response = self.wrap_json_response(
            data=minutes, code=ReturnCode.SUCCESS)
        return JsonResponse(response, safe=False)

    def post(self, request):
        if not already_authorized(request):
            response = self.wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(response, safe=False)
        user = get_user(request)
        # 从request中取出request数据
        received_body = request.body.decode('utf-8')
        # json转换成字典
        received_body = eval(received_body)
        minutes = received_body.get('minutes')
        activity_id = received_body.get('activity_id')
        activity = user.activity.all().get(activity_id=activity_id)
        activity.minutes = minutes
        activity.save()
        user.save()
        print(activity)
        response = self.wrap_json_response(code=ReturnCode.SUCCESS)
        return JsonResponse(response, safe=False)


# 查询特定日期的活动
def query(request):
    if not already_authorized(request):
        response = wrap_json_response(code=ReturnCode.UNAUTHORIZED)
        return JsonResponse(response, safe=False)
    user = get_user(request)
    begindate = request.GET.get('begindate')
    print(begindate)
    activityList = user.activity.all().filter(begindate=begindate)
    response = {}
    for i in activityList:
        item = i.to_dict()
        response[item['activity_name']] = item['activity_id']
    print(response)
    response = wrap_json_response(data=response, code=ReturnCode.SUCCESS)
    return JsonResponse(response, safe=False)