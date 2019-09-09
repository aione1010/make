// pages/login/index.js
const app = getApp()
const cookieUtil = require('./../../utils/cookie.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    password: '',
    openid: ''
  },
  usernameInput: function(e) {
    this.setData({
      user: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginEvent: function() {
    if (this.data.user.length == 0) {
      wx.showToast({
        title: '用户名不可为空!',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.password.length == 0) {
      wx.showToast({
        title: '密码不可为空!',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this
      var userInfo
      db.collection('organization').get({
        success(res) {
          userInfo = res.data[0].userInfo
          if (userInfo.hasOwnProperty(that.data.user)) {
            if (userInfo[that.data.user] == that.data.password) {
              wx.showToast({
                title: '登录成功！',
                icon: 'success',
                duration: 1000
              })
              wx.redirectTo({
                url: './../createActivity/index'
              })
            } else {
              wx.showToast({
                title: '密码错误，请重试！',
                icon: 'none',
                duration: 2000
              })
            }
          } else {
            wx.showToast({
              title: '用户名不存在！',
              icon: 'none',
              duration: 1000
            })
          }
        },
        fail(res) {}
      })
    }
  },
  // 登录授权
  authorize(res) {
    wx.login({
      success(res) {
        var code = res.code
        var appId = app.globalData.appId
        var nickname = app.globalData.userInfo.nickName
        wx.request({
          url:
            app.globalData.serverUrl +
            app.globalData.apiVersion +
            '/auth/authorize',
          method: 'POST',
          data: {
            code: code,
            appId: appId,
            nickname: nickname
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            code = res.data.code
            if (code === -501) {
              wx.showToast({
                title: '授权信息不完整',
                icon: 'none'
              })
            } else if (code === -100) {
              wx.showToast({
                title: '授权失败',
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: '授权成功'
              })
              var cookie = cookieUtil.getSessionIDFromResponse(res)
              cookieUtil.setCookieToStorage(cookie)
              wx.navigateTo({
                url: './../createActivity/index'
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
