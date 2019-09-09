// pages/createNewActivityPage/index.js

var app = getApp()
const cookieUtil = require('../../utils/cookie.js')
const db = wx.cloud.database();
function compareDate(date1,date2){
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if (oDate2.getTime() < oDate1.getTime()){
    return true;
  }else{
    return false;
  }
}
var page = Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityName: '',
    begindate: 'begin',
    enddate: 'end',
    item: ['请选择'],
    project: ['请选择'],
    
    indexi:0,
    indexp:0
  },
  bindKeyInput: function(e) {
    this.setData({
      activityName: e.detail.value,
    })
  },
  bindDateChange1: function(e) {
    this.setData({
      begindate: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    this.setData({
      enddate: e.detail.value
    });
    var date1=this.data.begindate,
    date2 = this.data.enddate;
    console.log(compareDate(date1, date2));
    if (compareDate(date1, date2)){
      wx.showToast({
        title: '截止日期不能比开始日期早！',
        icon:'none',
        duration:2000
      })
    }
  },
  bindItemChange: function(e) {
    this.setData({
      indexi: e.detail.value
    });
  },
  bindProjectChange: function(e) {
    this.setData({
      indexp: e.detail.value
    });
  },

  formSubmit(e) {
    var that = this;
    var date1 = this.data.begindate,
      date2 = this.data.enddate;
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    if (compareDate(date1, date2)) {
      wx.showToast({
        title: '截止日期不能比开始日期早',
        icon: 'none',
        duration: 1000
      })
    }
    if (this.data.activityName === '') {
      wx.showToast({
        title: '请填写活动名称',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.begindate === 'begin') {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.enddate === 'end') {
      wx.showToast({
        title: '请选择结束时间',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: app.globalData.serverUrl + app.globalData.apiVersion +'/service/activity',
        method: 'POST',
        data: {
          activityName: that.data.activityName,
          begindate: that.data.begindate,
          enddate: that.data.enddate,
          item: that.data.item[that.data.indexi],
          project: that.data.project[that.data.indexp]
        },
        header: header,
        success(res) {
          if(res.data.result_code===-101){
            var id = res.data.data.activity_id
            wx.showModal({
              title: '活动重复',
              content:'继续编辑活动内容',
              success(res){
                if(res.confirm){
                  // 继续编辑活动
                  wx.navigateTo({
                    url: './../editInfo/index?activity_id=' + id
                  })
                }else if(res.cancel){
                  return
                }
              }
            })
          } else if (res.data.result_code === -100){
            wx.showToast({
              title: '活动名称重复',
              icon: 'none',
              duration: 1000
            })
          }else{
            console.log(res.data.data.id)
            wx.navigateTo({
              url: './../editInfo/index?activity_id=' + res.data.data.id
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    db.collection('organization').get({
      success(res) {
        that.setData({
          item: res.data[0].item,
          project:res.data[0].project
        })
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