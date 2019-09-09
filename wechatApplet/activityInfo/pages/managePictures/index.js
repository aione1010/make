const app = getApp()
const imageUrl =
  app.globalData.serverUrl + app.globalData.apiVersion + '/service/image'
var cookieUtil = require('./../../utils/cookie.js')

Page({
  data: {
    // 需要上传的图片
    needUploadFiles: [],
    // backupedFiles每个元素四个字段 name, md5, path, isDownloaded
    // 已下载的备份图片
    downloadedBackupedFiles: [],
    activity_id: ''
  },

  // 选择图片上传
  chooseImage: function(e) {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          needUploadFiles: that.data.needUploadFiles.concat(res.tempFilePaths)
        })
      }
    })
  },

  // 长按确认函数
  longTapConfirm: function(e) {
    var that = this
    // 上传视图的确认菜单
    var uploadConfirmList = ['取消上传']
    // 已备份图片列表视图的确认菜单
    var downloadedConfirmList = ['删除备份']
    if (e.currentTarget.dataset.type == 'UploadView') {
      var itemList = uploadConfirmList
    } else {
      var itemList = downloadedConfirmList
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function(res) {
        if (res.cancel) {
          return
        }
        // 上传视图的确认菜单逻辑
        if (e.currentTarget.dataset.type == 'UploadView' && res.tapIndex == 0) {
          var imgId = e.currentTarget.dataset.id
          var newNeedUploadFiles = that.data.needUploadFiles
          for (var i = 0; i < newNeedUploadFiles.length; i++) {
            if (newNeedUploadFiles[i] == imgId) {
              newNeedUploadFiles.splice(i, 1)
            }
            that.setData({
              needUploadFiles: newNeedUploadFiles
            })
          }
        }
        // 已备份图片列表视图的确认菜单逻辑
        if (
          e.currentTarget.dataset.type == 'DownloadedView' &&
          res.tapIndex == 0
        ) {
          var imgIndex = e.currentTarget.dataset.index
          var imgItem = that.data.downloadedBackupedFiles[imgIndex]
          console.log(imgIndex)
          console.log(imgItem)
          console.log(that.data.downloadedBackupedFiles)
          var newDownloadedBackupedFiles = that.data.downloadedBackupedFiles
          newDownloadedBackupedFiles.splice(imgIndex, 1)
          console.log(newDownloadedBackupedFiles)
          that.setData({
            downloadedBackupedFiles: newDownloadedBackupedFiles
          })
          that.deleteBackup(imgItem)
        }
      }
    })
  },

  // 上传图片文件
  uploadFiles: function() {
    var that = this
    that.setData({
      newBackupedFiles: []
    })
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    for (var i = 0; i < this.data.needUploadFiles.length; i++) {
      var file = this.data.needUploadFiles[i]
      wx.uploadFile({
        url:
          app.globalData.serverUrl +
          app.globalData.apiVersion +
          '/service/image',
        formData: {
          activity_id: that.data.activity_id
        },
        header: header,
        filePath: file,
        name: 'test',
        success: function(res) {
          var resutData = JSON.parse(res.data)
          var imgData = resutData.data[0]
          console.log
          var uploadedFile = {
            name: imgData.name,
            md5: imgData.md5,
            path: '',
            isDownloaded: false
          }
          // 上传成功的保存到newBackupedFiles数组里
          that.downloadFile(uploadedFile)
        }
      })
    }

    wx.showToast({
      title: '上传成功'
    })
    // 清空等待上传的文件列表
    this.setData({
      needUploadFiles: []
    })
  },

  // 删除图片
  deleteBackup: function(imgItem) {
    console.log('delete a backup file.' + imgItem)
    wx.request({
      url: imageUrl + '?md5=' + imgItem.md5,
      method: 'DELETE',
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '删除成功'
        })
      }
    })
  },

  onLoad: function(options) {
    this.setData({
      activity_id: options.activity_id
    })
    this.downloadAllFromRemote()
  },

  // 下载所有的已备份图片
  downloadAllFromRemote: function() {
    var that = this
    // 获得cookie，携带cookie信息
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    // 1. 请求后台获取已备份的图片列表
    wx.request({
      url: imageUrl + '/list?activity_id=' + that.data.activity_id,
      method: 'GET',
      header: header,
      success: function(res) {
        var imageList = res.data.data
        for (var i = 0; i < imageList.length; i++) {
          // 2. 逐个调用downloadFile进行图片下载
          that.downloadFile(imageList[i])
        }
      }
    })
  },

  // 下载图片
  downloadFile: function(imgItem) {
    var that = this
    var downloadUrl = imageUrl + '?md5=' + imgItem.md5
    wx.downloadFile({
      url: downloadUrl,
      success: function(res) {
        var filepath = res.tempFilePath
        console.log(filepath)
        var newDownloadedBackupedFiles = that.data.downloadedBackupedFiles
        imgItem.path = filepath
        newDownloadedBackupedFiles.unshift(imgItem)
        that.setData({
          downloadedBackupedFiles: newDownloadedBackupedFiles
        })
        console.log(that.data.downloadedBackupedFiles)
      }
    })
  },
  submit() {
    var upLoadimg = this.data.downloadedBackupedFiles
    var md5 = []
    for (var i = 0; i < upLoadimg.length; i++) {
      md5.push(upLoadimg[i]['md5'])
    }
    var that = this
    // 获得cookie，携带cookie信息
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: imageUrl + '/submit',
      method: 'POST',
      data: {
        activity_id: that.data.activity_id,
        md5: md5
      },
      header: header,
      success(res) {
        if (res.data.result_code === 0) {
          wx.navigateTo({
            url: './../logout/index'
          })
        }
      }
    })
  }
})
