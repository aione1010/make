// pages/activityInfo/index.js
wx.cloud.init({});
const db = wx.cloud.database({});
var app=getApp()
var cookieUtil = require('./../../utils/cookie.js')
var url = app.globalData.serverUrl+app.globalData.apiVersion+'/service/minutes'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:'',
    minutes:''
  },
  /* search(e) {
    const _ = db.command;
    var that = this;
    var _id = this.data._id;
    db.collection('activityInfo').where({
      _id: _.eq(that.data._id)
    }).get({
      success(res) {
        if (res.data[0].hasOwnProperty('minutes')) {
          that.setData({
            minutes:res.data[0].minutes
          })
        } else {
          wx.showToast({
            title: '无活动纪要！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }, */
  inputText(e) {
    var value = e.detail.value.trim();
    this.setData({
      minutes: value
    });
    console.log(this.data.minutes);
  },
  submitPage(e){
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.cookie = cookie
    var that = this
    wx.request({
      url:url,
      method:'POST',
      data:{
        activity_id:that.data.activity_id,
        minutes: that.data.minutes
      },
      header:header,
      success(res){
        if (res.data.result_code === 0) {
          wx.navigateTo({
            url: './../managePictures/index?activity_id=' + that.data.activity_id
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.cookie = cookie
    var that = this
    this.setData({
      activity_id: options.activity_id
    });
    /* console.log(this.data._id); */
    wx.request({
      url:url+'?activity_id='+that.data.activity_id,
      header:header,
      success(res){
       /*  console.log(res.data.data) */
        if (res.data.data.length === 0) {
          wx.showToast({
            title: '无活动纪要信息！',
            icon: 'none'
          })
        } else {
          that.setData({
            minutes: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})