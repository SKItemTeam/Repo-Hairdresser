// pages/order/order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hairName:'',
    shopName:'',
    array: ['洗剪造型', '洗', '剪', '造型'],
    index: 0,
    date: '2016-09-01',
    time: '12:01',
    money: '130.00',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      hairName: options.hairName,
      shopName: options.shopName,
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

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    }),
      this.pickTimeEvent()
  },

  pickTimeEvent: function () {

  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },


  commitOrderEvent: function () {
    var that = this
    app.http.request({
      url: "orders",
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + app.globalData.token,
      },
      method: "POST",
      data: {
        "address": "",
        "brokerage": 0,
        "couponnum": "",
        "createdate": "2017-11-29 15:33:03",
        "creator": 0,
        "datalevel": "NORMAL",
        "editer": 0,
        "hairdresserName": this.data.hairName,
        "id": 0,
        "itemName": this.data.array[this.data.index],
        "memo": "string",
        // "mktime": this.data.date + " " + this.data.time,
        "mktime": this.data.date + " " + this.data.time + ":00",
        "modifydate": "2017-11-29 15:33:03",
        "name": "",
        "ordernum": "",
        "pay": this.data.money,
        "phone": "string",
        "priceValue": 0,
        "shopName": this.data.shopName,
        "status": "MAKING"
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

})