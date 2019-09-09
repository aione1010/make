import json
import requests
from utils import proxy
import applet.settings

from authorization.models import User

# from utils.wx.crypt import WXBizDataCrypt


# 判断是否已经授权
def already_authorized(request):
    is_authorized = False

    if request.session.get('is_authorized'):
        is_authorized = True
    return is_authorized


def c2s(appid, code):
    return code2session(appid, code)


def code2session(appid, code):
    API = 'https://api.weixin.qq.com/sns/jscode2session'
    params = 'appid=%s&secret=%s&js_code=%s&grant_type=authorization_code' % \
        (appid, applet.settings.WX_APP_SECRET, code)
    URL = API + '?' + params
    response = requests.get(url=URL, proxies=proxy.proxy())
    data = json.loads(response.text)
    print(data)
    return data


def get_user(request):
    if not already_authorized(request):
        raise Exception('not authorized request')
    open_id = request.session.get('open_id')
    user = User.objects.get(open_id=open_id)
    return user
