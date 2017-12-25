// pages/balance/balance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName: '',
    itemName: '',
    hairName: '',
    couponsId: '',
    couponsName: '',
    totalPrice: 130,
    couponsPrice: -30,
    lastPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopName: options.shopName,
      itemName: options.itemName,
      hairName: options.hairName,
    })
    this.setData({
      lastPrice: this.data.totalPrice + this.data.couponsPrice
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

  selectCouponsEvent: function () {
    wx.navigateTo({
      url: '../../pages/coupons/coupons?isForSelect=true',
    })
  },

  payEvent: function (e) {
    var appid = "wx7f3c4f2d0f858029"
    console.log(appid)
    var timestamp = Date.parse(new Date) / 1000
    console.log(timestamp)
    var nonceStr = Math.random().toString(36).substr(2, 15)
    console.log(nonceStr)

    var stringA = "appid=" + appid + "&body=test&device_info=1000&mch_id=10000100&nonce_str=" + nonceStr;
    var stringSignTemp = stringA + "&key=192006250b4c09247ec02edce69f6a2d" //注：key为商户平台设置的密钥key

    var md5util = require("../MD5/md5.js");
    var sign = md5util.hexMD5(stringSignTemp).toUpperCase() //注：MD5签名方式

    wx.requestPayment({
      'timeStamp': timestamp.toString(),
      'nonceStr': nonceStr,
      'package': 'prepay_id=wx2017033010242291fcfe0db70013231072', //统一下单接口返回的 prepay_id
      'signType': 'MD5',
      'paySign': sign,
      'success': function (res) {
        console.log('requestPayment suc');
      },
      'fail': function (res) {
        console.log('requestPayment fail');
      },
      'complete': function (res) {
        console.log('requestPayment complete');
      }
    })
  },
})