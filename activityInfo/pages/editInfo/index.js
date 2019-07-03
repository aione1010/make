// pages/editInfo/index.js
wx.cloud.init({});
const db = wx.cloud.database({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    institutionList: [],
    index: 0,
    activityName: "",
    institution: [],
    chooseDelete:[],
    check:false,
    _id:''
  },
  search() {
    const _ = db.command;
    var that = this;
    db.collection('activityInfo').where({
      activityName: _.eq(that.data.activityName)
    }).get({
      success: function(res) {
        /*console.log(res) */
        
        if (res.data[0].hasOwnProperty('institution')) {
          that.setData({
            institution: res.data[0].institution
          })
        } else {
          wx.showToast({
            title: '暂未添加机构信息！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    });

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
      activityName: options.activityName
    });
    console.log(this.data.activityName);
    
    db.collection('activityInfo').where({
      activityName: _.eq(that.data.activityName)
    }).get({
      success: function (res) {
        /*console.log(res) */
        that.setData({
          _id: res.data[0]._id
        })
        /* console.log(that.data._id) */
      }
    });
    //获得组织机构列表
    db.collection('organization').get({
      success(res) {
        that.setData({
          institutionList: res.data[0].institution
        })
      }
    })
  },
  //把活动机构信息传到相应活动下
  nextPage(e){
    const _ = db.command;
    var that = this;
    var _id = this.data._id;
    /* console.log(this.data.institution);
    console.log(_id); */
    if(this.data.institution.length==0){
      wx.showToast({
        title: '请添加活动机构信息！',
        icon:'none',
        duration:2000
      })
    }
    db.collection('activityInfo').doc(_id).update({
      data:{
        institution:that.data.institution
      },
      success(){
        wx.navigateTo({
          url: './../peopleInfo/index?_id=' + that.data._id
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