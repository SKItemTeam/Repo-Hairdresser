// pages/coupons/coupons.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isForSelect: false,
    couponsList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isForSelect: options.isForSelect
    })
    this.getCouponsList()
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


  couponsDetailEvent:function (e) {
    wx.navigateTo({
      url: '../../pages/coupons_detail/coupons_detail?isForSelect=' + this.data.isForSelect + '&id=' + e.currentTarget.dataset.id + '&conditions=' + e.currentTarget.dataset.conditions
    })
  }, 



  getCouponsList: function () {
    var that = this
    console.log(app.globalData.token)
    app.http.request({
      url: "coupons/list4user/10/0",
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + app.globalData.token,
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.data.rows.length; i++) {
          if (res.data.rows[i].status == 'NORMAL') {
            res.data.rows[i].couponsRightClass = 'coupons-right'
            res.data.rows[i].couponsRightText = '查看详情'
            res.data.rows[i].couponsLeftImage = '/imgs/voucher_active.png' 
            res.data.rows[i].couponsTime = res.data.rows[i].deadline.substring(0, 10)
            res.data.rows[i].bindtapEvent = 'couponsDetailEvent'
          }
          else {
            res.data.rows[i].couponsRightClass = 'coupons-right-gray'
            res.data.rows[i].couponsRightText = '已过期'
            res.data.rows[i].couponsLeftImage = '/imgs/voucher_gray.png' 
            res.data.rows[i].couponsTime = res.data.rows[i].deadline.substring(0, 10)
            res.data.rows[i].bindtapEvent = ''
          }
        }
        that.setData({
          couponsList: res.data.rows
        })
        console.log(that.data.couponsList)
      }
    })
  },


})