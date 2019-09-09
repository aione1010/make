import os
from django.http import Http404, FileResponse, JsonResponse
from applet import settings
from utils.response import ReturnCode, CommonResponseMixin, wrap_json_response
import hashlib
from PIL import Image
import PIL.ExifTags
# django的类视图需要继承这个View
from django.views import View
from utils.auth import already_authorized, get_user
import json


# Create your views here.
class ImageListView(View, CommonResponseMixin):

    def get(self, request):
        if not already_authorized(request):
            response = wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(data=response, safe=False)
        user = get_user(request)
        activity_id = request.GET.get('activity_id')
        pics = user.activity.all().get(
            activity_id=activity_id).to_dict().get('pics')
        pics = json.loads(pics)
        # print(pics)
        response_data = []
        for image_file in pics:
            print(image_file)
            response_data.append({"name": image_file, "md5": image_file[:-4]})
        response_data = self.wrap_json_response(data=response_data)
        return JsonResponse(data=response_data)


class ImageView(View, CommonResponseMixin):

    # 文件下载
    def get(self, request):
        md5 = request.GET.get('md5')
        imgfile = os.path.join(settings.IMAGES_DIR, md5 + '.jpg')
        if not os.path.exists(imgfile):
            return Http404()
        else:
            # data = open(imgfile, 'rb').read()
            # return HttpResponse(content=data, content_type='image/jpeg')
            return FileResponse(open(imgfile, 'rb'), content_type='image/jpeg')

    # 文件上传
    def post(self, request):
        if not already_authorized(request):
            response = wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(data=response, safe=False)
        files = request.FILES  # 从request里提取上传的文件，获得的是一个{key:value}对象
        response = []
        for key, value in files.items():  # key——文件的名字，value——文件的内容
            content = value.read()  # 调用read()方法读取文件内容
            md5 = hashlib.md5(content).hexdigest()  # 对content计算md5，然后保存成十六进制
            path = os.path.join(settings.IMAGES_DIR, md5 + '.jpg')  # 文件的路径
            with open(path, 'wb') as f:
                f.write(content)
            response.append({'name': key, 'md5': md5})
        message = 'post method success'
        # response = utils.response.wrap_json_response(message=message)
        response = self.wrap_json_response(
            data=response, code=ReturnCode.SUCCESS, message=message)
        return JsonResponse(data=response, safe=False)

    # 对文件进行删除
    def delete(self, request):
        if not already_authorized(request):
            response = wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(data=response, safe=False)
        md5 = request.GET.get('md5')
        img_name = md5 + '.jpg'
        path = os.path.join(settings.IMAGES_DIR, img_name)
        if os.path.exists(path):
            os.remove(path)
            message = 'remove success'
        else:
            message = 'file(%s) not found.' % img_name

        response = self.wrap_json_response(
            code=ReturnCode.SUCCESS, message=message)
        return JsonResponse(data=response, safe=False)


def get_exifInfo(path, md5):
    result = {}
    im = Image.open(path)
    try:
        exif = {
            PIL.ExifTags.TAGS[k]: v
            for k, v in im._getexif().items()
            if k in PIL.ExifTags.TAGS
        }
        gpsInfo = exif.get('GPSInfo', '')
        dateTime = exif.get('DateTime', '')
        if gpsInfo != '':
            Latitude = str(gpsInfo[2][0][0]) + '°' + str(
                gpsInfo[2][1][0]) + "'" + str(
                    gpsInfo[2][2][0] / gpsInfo[2][2][1]) + '"' + gpsInfo[1]
            Longitude = str(gpsInfo[4][0][0]) + '°' + str(
                gpsInfo[4][1][0]) + "'" + str(
                    gpsInfo[4][2][0] / gpsInfo[4][2][1]) + '"' + gpsInfo[3]
            gpsInfo_0 = {'Latitude': Latitude, 'Longitude': Longitude}
            result[md5] = {'dateTime': dateTime, 'gpsInfo': gpsInfo_0}
        result[md5] = {'dateTime': dateTime, 'gpsInfo': gpsInfo}
        return result
    except AttributeError:
        result[md5] = {'dateTime': '', 'gpsInfo': ''}
        return result


def submit(request):
    if not already_authorized(request):
        response = wrap_json_response(code=ReturnCode.UNAUTHORIZED)
        return JsonResponse(data=response, safe=False)
    user = get_user(request)
    received_body = request.body.decode('utf-8')
    # json转换成字典
    received_body = eval(received_body)
    md5s = received_body.get('md5')
    activity_id = received_body.get('activity_id')
    activity = user.activity.all().get(activity_id=activity_id)
    pics = activity.to_dict().get('pics')
    pics = json.loads(pics)
    picInfo = activity.to_dict().get('picInfo')
    picInfo = json.loads(picInfo)
    pics_ = []
    picInfo_ = {}
    for md5 in md5s:
        path = os.path.join(settings.IMAGES_DIR, md5 + '.jpg')
        imgInfo = get_exifInfo(path, md5)
        name = md5 + '.jpg'
        pics_.append(name)
        picInfo_[md5] = imgInfo[md5]
    activity.pics = json.dumps(pics_)
    activity.picInfo = json.dumps(picInfo_)
    activity.save()
    user.save()
    response = wrap_json_response(code=ReturnCode.SUCCESS)
    return JsonResponse(data=response, safe=False)
