// pages/peopleInfo/index.js
wx.cloud.init({});
const db = wx.cloud.database({});
var app=getApp()
var cookieUtil = require('./../../utils/cookie.js')
var url = app.globalData.serverUrl+app.globalData.apiVersion+'/service/people'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    activity_id: "",
  },
  /* search(e) {
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.cookie = cookie
    var that = this
    wx.request({
      url: url+'?activity_id='+that.data.activity_id,
      method:'GET',
      header:header,
      success(res){
        if(res.data.data.length===0){
          wx.showToast({
            title: '无活动人员信息！',
            icon: 'none'
          })
        }else{
          var name = res.data.data.join(';');
          var newName = name+";"+that.data.name;
          console.log("newName: "+newName);
          that.setData({
            name: newName
          })
        }
        
      }
    })
  }, */
  inputText(e){
    var value = e.detail.value.trim();
    this.setData({
      name:value
    });
  },
  nextPage(e){
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.cookie = cookie
    var that = this
    var nameFilter
    if (this.data.name.length !=0){
      var name_ = this.data.name.split(/,|;|，|；/g);
      nameFilter = name_.filter(function (item, index, array) {
        return item.length > 0;
      })
    }else{
      nameFilter=[]
    }
    wx.request({
      url: url,
      method:'POST',
      data:{
        activity_id:that.data.activity_id,
        name: nameFilter
      },
      header : header,
      success(res){
        if (res.data.result_code ===0){
          wx.navigateTo({
            url: './../activityInfo/index?activity_id=' + that.data.activity_id
          })
        }
      }
    })
     /*  const _ = db.command;
      var that = this;
      var _id = this.data._id;
      var name_ = this.data.name.split(/,|;/g);
      var nameFilter = name_.filter(function(item,index,array){
        return item.length>0;
      })
      console.log(nameFilter)
      db.collection('activityInfo').doc(_id).update({
        data: {
          name: nameFilter
        },
        success() {
          wx.navigateTo({
            url: './../activityInfo/index?_id=' + that.data._id
          })
        }
      }) */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.cookie = cookie
    var that = this
    this.setData({
      activity_id: options.activity_id
    });
   
    
    wx.request({
      url: url + '?activity_id=' + that.data.activity_id,
      method: 'GET',
      header: header,
      success(res) {
        if (res.data.data.length === 0) {
          wx.showToast({
            title: '无活动人员信息！',
            icon: 'none'
          })
        } else {
          var name = res.data.data.join(';');
          var newName = name + ";" + that.data.name;
          console.log("newName: " + newName);
          that.setData({
            name: newName
          })
        }

      }
    })
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