// pages/evaluate_context/evaluate_context.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shopName: '',
    hairName: '',
    shopMark: 0,
    hairMark: 0,
    shopStarLevelList: ['/imgs/star_gray.png', '/imgs/star_gray.png', '/imgs/star_gray.png', '/imgs/star_gray.png', '/imgs/star_gray.png'],
    hairStarLevelList: ['/imgs/star_gray.png', '/imgs/star_gray.png', '/imgs/star_gray.png', '/imgs/star_gray.png', '/imgs/star_gray.png'],
    shopComment: '亲！请留下您的评价，下次为你提供更优质的服务。。。',
    hairComment: '亲！请留下您的评价，下次为你提供更优质的服务。。。',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopName: options.shopName,
      hairName: options.hairName,
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
  
  },

  shopStarEvent : function (e) {
    var index = e.currentTarget.dataset.index
    shopMark = index + 1
    var levelList = []
    for (var i = 0; i < 5; i++) {
      if (i <= index) {
        levelList[i] = '/imgs/star_active.png'
      }
      else {
        levelList[i] = '/imgs/star_gray.png'
      } 
    } 
    var that = this
    that.setData({
      shopStarLevelList: levelList,
    })
  },

  hairStarEvent: function (e) {
    var index = e.currentTarget.dataset.index
    hairMark = index + 1
    var levelList = []
    for (var i = 0; i < 5; i++) {
      if (i <= index) {
        levelList[i] = '/imgs/star_active.png'
      }
      else {
        levelList[i] = '/imgs/star_gray.png'
      }
    }
    var that = this
    that.setData({
      hairStarLevelList: levelList,
    })
  },

  shopCommentInput : function (e) {
    this.setData({
      shopComment: e.detail.value
    })
  },

  hairCommentInput: function (e) {
    this.setData({
      hairComment: e.detail.value
    })
  },

  commitEvent: function () {
    var that = this
    app.http.request({
      url: "metes",
      header: {
        'content-type': 'application/json',
        'authorization': "Bearer " + app.globalData.token,
      },
      method: "POST",
      data: {
        "comment": that.data.shopComment,
        "mark": that.data.shopMark,
        "owner": {
          "id": 1,
          "name": that.data.shopName,
        }
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '订单已提交',
          showCancel: false,
          success: function (res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },

})