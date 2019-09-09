import applet.settings


def proxy():
    if applet.settings.USE_PROXY:
        return {}
    else:
        return {}
