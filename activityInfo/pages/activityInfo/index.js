// pages/activityInfo/index.js
wx.cloud.init({});
const db = wx.cloud.database({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id:'',
    minutes:''
  },
  search(e) {
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
  },
  inputText(e) {
    var value = e.detail.value.trim();
    this.setData({
      minutes: value
    });
    console.log(this.data.minutes);
  },
  submitPage(e){
    const _ = db.command;
    var that = this;
    var _id = this.data._id;
    db.collection('activityInfo').doc(_id).update({
      data: {
        minutes: that.data.minutes
      },
      success() {
        wx.navigateTo({
          url: './../managePictures/index?_id=' + that.data._id
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _id: options._id
    });
    /* console.log(this.data._id); */
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