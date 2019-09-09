// pages/query/index.js
wx.cloud.init({});
const db = wx.cloud.database();
var app=getApp()
var cookieUtil = require('./../../utils/cookie.js')
var url = app.globalData.serverUrl + app.globalData.apiVersion + '/service/query'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"请选择日期",
    content:[],
    activityObj:{}
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  query(e){
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.cookie = cookie
    var that=this
    wx.request({
      url: url +'?begindate='+that.data.date,
      method:'GET',
      header:header,
      success(res){
        if (res.data.result_code === 0){
          var icontent = Object.keys(res.data.data)
          if(icontent.length===0){
            wx.showToast({
              title: '该日无活动信息',
              icon: 'none',
              duration: 2000
            })
          }else{
            that.setData({
              content: icontent,
              activityObj: res.data.data
            })
          }
        }
      }
    })
    /* const _ = db.command;
    var that = this;
    db.collection('activityInfo').where({
      begindate: _.eq(that.data.date)
    }).get({
      success: function (res) {
        if (res.data.length >= 1) {
          var newContent=[];
          for(var i=0;i<res.data.length;i++){
            newContent.push(res.data[i])
          }
          that.setData({
            content: newContent
          })
        } else {
         wx.showToast({
           title: '该日无活动信息',
           icon:'none',
           duration:2000
         })
        }
        
        console.log(that.data.content[0].activityName);
        console.log(res);
      }
    }); */
  },
  nextPage(e){
    var index = e.currentTarget.dataset.index;
    var activityName = this.data.content[index];
    /* console.log(this.data.content)
    console.log(activityName)
    console.log(this.data.activityObj) */
    var activity_id = this.data.activityObj[activityName]
    /* console.log(activity_id) */
    wx.navigateTo({
      url:'./../editInfo/index?activity_id='+activity_id
    })
  },
  beforePage(){
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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