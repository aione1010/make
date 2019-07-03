// pages/query/index.js
wx.cloud.init({});
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"请选择日期",
    content:''
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  query(e){
    const _ = db.command;
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
    });
  },
  nextPage(e){
    var index = e.currentTarget.dataset.index;
    var activityName = this.data.content[index].activityName;
    wx.navigateTo({
      url:'./../editInfo/index?activityName='+activityName
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