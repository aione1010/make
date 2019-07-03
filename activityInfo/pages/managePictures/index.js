// pages/managePictures/index.js
wx.cloud.init({});
const db = wx.cloud.database();
var fileId = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: [],
    fID: [],
    dfID:[],
    _id: '',
    show: false,
    /* files: [],
    showfiles: [], */
    imgUrl: []
  },
  deleteImg(e) {
    var that = this;

    var imgUrl = that.data.imgUrl;
    var fID=that.data.fID;
    var dfID = that.data.dfID;

    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
   

    wx.showModal({

      title: '提示',

      content: '确定要删除此图片吗？',

      success: function(res) {

        if (res.confirm) {
          imgUrl.splice(index, 1);
          dfID = fID[index];
          fID.splice(index,1);
        } else if (res.cancel) {



          return false;

        }

        that.setData({

          imgUrl,
          fID,
          dfID

        });
        console.log(that.data.imgUrl)
        console.log(fID,dfID);
      }

    })
  },
  uploadImg(e) {

    var that = this;
    //选择照片
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;

        that.setData({
          imgUrl: that.data.imgUrl.concat(tempFilePaths.map((item) => {
            return item
          }))
        })
        console.log(that.data.imgUrl);
        /* console.log(cloudPath); */
        Promise.all(tempFilePaths.map((item, i) => {
          return wx.cloud.uploadFile({
            cloudPath: 'activityPics' + '_' + i + Date.now() + item.match(/\.[^.]+?$/),
            filePath: item
          })
        })).then((res) => {
          wx.hideLoading();
          that.setData({
            fID: that.data.fID.concat(res.map((item) => {
              return item.fileID;
            }))
            /* ,
                        showfiles: that.data.showfiles.concat(tempFilePaths.map((item) => {
                          return item
                        })) */
          })
          console.log(that.data.fID)
        }) .catch(error=>console.log(e))
      }
    })
  },
  submitData(res) {
    console.log(this.data.fID);
    const _ = db.command;
    var that = this;
    var _id = this.data._id;
    wx.cloud.deleteFile({
      fileList: that.data.dfID,
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: err => {
        // handle error
      }
    })
    db.collection('activityInfo').doc(_id).update({
      data: {
        fID: that.data.fID
      },
      success() {
        wx.navigateTo({
          url: './../logout/index'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var fID;
    const _ = db.command;
    this.setData({
      _id: options._id
    });
    var _id = this.data._id;
    db.collection('activityInfo').doc(_id).get({
      success: function(res) {
        console.log(res.data)
        if (res.data.hasOwnProperty('fID')) {
          fID = res.data.fID;
          that.setData({
            fID: fID
          });
          wx.cloud.getTempFileURL({
            fileList: fID,
            success: res => {
              // get temp file URL
              /* console.log(res.fileList) */
              that.setData({
                imgUrl: that.data.imgUrl.concat(res.fileList.map((item) => {
                  return item.tempFileURL;
                }))
              })
              console.log(that.data.imgUrl);
            },
            fail: err => {
              // handle error
            }
          })
        } else {
          wx.showToast({
            title: '未上传图片',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
})