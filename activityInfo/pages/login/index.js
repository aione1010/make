// pages/login/index.js
/* const app=getApp(); */
wx.cloud.init({});
const db = wx.cloud.database({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    password: "",
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
      var that = this;
      var userInfo;

      /* wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: app.globalData.Baseurl,
              header: {
                'content-type': 'application/json'
              },
              data: {
                code: res.code,
                userName: that.data.user,
                password: that.data.password
              },
              success: function(res) {
                if (res.data.status == 0) {
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                  });
                  wx.navigateTo({
                    url: './../pages/createActivity/index'
                  })
                } else {
                  wx.showModal({
                    title: '错误',
                    content: ''
                  })
                }
              }
            })
          }

        }
      }) */
      db.collection('organization').get({
        success(res){
          userInfo = res.data[0].userInfo;
          if(userInfo.hasOwnProperty(that.data.user)){
            if(userInfo[that.data.user]==that.data.password){
              wx.showToast({
                title: '登录成功！',
                icon: 'success',
                duration:1000
              });
              wx.redirectTo({
                url: './../createActivity/index'
              })
            }else{
              wx.showToast({
                title: '密码错误，请重试！',
                icon: 'none',
                duration: 2000
              });
            }
          }else{
            wx.showToast({
              title: '用户名不存在！',
              icon: 'none',
              duration: 1000
            });
          }
        },
        fail(res){
          
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /* db.collection('organization').get({
      success(res){
        console.log(res.data[0].userInfo);
      }
    }) */
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})