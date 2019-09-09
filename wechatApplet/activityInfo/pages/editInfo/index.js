// pages/editInfo/index.js
wx.cloud.init({});
const db = wx.cloud.database({});
var app = getApp()
const cookieUtil = require('../../utils/cookie.js')
const url = app.globalData.serverUrl + app.globalData.apiVersion + '/service/institution'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    institutionList: [],
    index: 0,
    activity_id: "",
    institution:[],
    chooseDelete:[],
    check:false
  },
  
  listChoose(e) {
    this.setData({
      index: e.detail.value
    })
  },
  //添加组织机构
  addItem(e) {
    var array = this.data.institutionList,
      arr=this.data.institution,
      index = this.data.index;
    if (arr.indexOf(array[index])<0){
      arr.push(array[index])
    }
    this.setData({
      institution:arr
    })
  },
  //单击加入删除队列，双击踢出队列
  clickItem(e){
    var that = this;
    var arr=this.data.chooseDelete;
    if(arr.indexOf(e.currentTarget.id)>=0){
      arr.splice(arr.indexOf(e.currentTarget.id),1);
    }else{
      arr.push(e.currentTarget.id)
    }
    this.setData({
      chooseDelete:arr
    });
    
    console.log(this.data.chooseDelete);
  },
  //删除选中项
  deleteIns(e){
    var arr = this.data.chooseDelete;
    var arr1 = this.data.institution;
    for(var i=0;i<arr.length;i++){
      arr1.splice(arr[i],1);
    }
    this.setData({
      institution:arr1,
      chooseDelete:[],
      check:false    //重置选中选项
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _ = db.command;
    var that = this;
    //由上一页所带来的信息
    this.setData({
      activity_id: options.activity_id
    });
   
    //获得组织机构列表
    db.collection('organization').get({
      success(res) {
        that.setData({
          institutionList: res.data[0].institution
        })
      }
    })
    //获得已添加组织列表
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    var that = this
    wx.request({
      url: url + '?activity_id=' + that.data.activity_id,
      method: 'GET',
      header: header,
      success(res) {
        if (res.data.data.length === 0) {
          wx.showToast({
            title: '无组织机构信息！',
            icon: 'none'
          })
        }
        that.setData({
          institution: res.data.data
        })
      }
    })
  },
  //把活动机构信息传到相应活动下
  nextPage(e){
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    var that = this
    wx.request({
      url:url,
      method:'POST',
      data:{
        institution:that.data.institution,
        activity_id:that.data.activity_id
      },
      header:header,
      success(res){
        if (res.data.result_code===0){
          console.log('id:' + that.data.activity_id)
          wx.navigateTo({
            url: './../peopleInfo/index?activity_id=' + that.data.activity_id
          })
        }
      }
    })
    /* {
      db.collection('activityInfo').doc(_id).update({
        data: {
          institution: that.data.institution
        },
        success() {
          wx.navigateTo({
            url: './../peopleInfo/index?_id=' + that.data._id
          })
        }
      })
    } */
    
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