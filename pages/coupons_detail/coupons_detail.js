// pages/coupons_detail/coupons_detail.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isForSelect: false,
    id: '',
    conditions: '',
    selectStyle: '',
    detailInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isForSelect: options.isForSelect,
      id: options.id,
      conditions: options.conditions,
    })
    console.log('coupons_details')
    var isSelect = this.data.isForSelect
    console.log(isSelect)
    if (isSelect == 'true') {
      console.log('1')
      this.setData({
        selectStyle: 'display:block'
      })
    }
    else {
      console.log('2')
      this.setData({
        selectStyle: 'display:none'
      })
    }
    console.log(this.data.selectStyle)
    this.getDetailInfo()
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

  getDetailInfo: function () {
    var that = this
    console.log(app.globalData.token)
    app.http.request({
      url: "/coupons/" + that.data.id,
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + app.globalData.token,
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        // for (var i = 0; i < res.data.rows.length; i++) {
        //   if (res.data.rows[i].status == 'NORMAL') {
        //     res.data.rows[i].couponsRightClass = 'coupons-right'
        //     res.data.rows[i].couponsRightText = '查看详情'
        //     res.data.rows[i].couponsLeftImage = '/imgs/voucher_active.png'
        //     res.data.rows[i].couponsTime = res.data.rows[i].deadline.substring(0, 10)
        //     res.data.rows[i].bindtapEvent = 'couponsDetailEvent'
        //   }
        //   else {
        //     res.data.rows[i].couponsRightClass = 'coupons-right-gray'
        //     res.data.rows[i].couponsRightText = '已过期'
        //     res.data.rows[i].couponsLeftImage = '/imgs/voucher_gray.png'
        //     res.data.rows[i].couponsTime = res.data.rows[i].deadline.substring(0, 10)
        //     res.data.rows[i].bindtapEvent = ''
        //   }
        // }
        res.data.limitTime = res.data.createdate.substring(0, 10) + ' 至 ' + res.data.modifydate.substring(0, 10)
        that.setData({
          detailInfo: res.data
        })
        console.log(that.data.detailInfo)
      }
    })
  },

  selectCouponsEvent : function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 3];  // 结账页面

    // 直接调用上级页面的setData()方法，把数据存到上级页面中去
    prevPage.setData({
      couponsId: this.data.id,
      couponsName: this.data.detailInfo.name
    })

    wx.navigateBack({
      delta: 2
    })
  },

})