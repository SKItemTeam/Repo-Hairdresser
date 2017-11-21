// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'none'
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
  
  },


  payEvent:function(e){
    var appid = "wxc71c4fcdedf1c22f"

    var timestamp = Date.parse(new Date) / 1000
    console.log(timestamp)
    var nonceStr = Math.random().toString(36).substr(2, 15)
    console.log(nonceStr)

    var stringA = "appid=" + appid +"&body=test&device_info=1000&mch_id=10000100&nonce_str=" + nonceStr;
    var stringSignTemp = stringA + "&key=192006250b4c09247ec02edce69f6a2d" //注：key为商户平台设置的密钥key

    var md5util = require("../MD5/md5.js");
    var sign = md5util.hexMD5(stringSignTemp).toUpperCase() //注：MD5签名方式

    wx.requestPayment({
      'timeStamp': timestamp.toString(),
      'nonceStr': nonceStr,
      'package': 'wx2017033010242291fcfe0db70013231072',
      'signType': 'MD5',
      'paySign': sign,
      'success': function (res) {
        console.log('requestPayment suc');
      },
      'fail': function (res) {
        console.log('requestPayment fail');
      },
      'complete':function(res){
        console.log('requestPayment complete');
      }
    })
  },

  appointmentTapEvent: function(e){
    var that = this;
    that.setData({
      currentTab: 'appointment'
    })
  },
  
  in_serviceTapEvent:function(e){
    this.setData({
      currentTab: 'in_service'
    })
  },

  completeTapEvent: function (e) {
    this.setData({
      currentTab: 'complete'
    })
  },

  evaluateTapEvent: function (e) {
    this.setData({
      currentTab: 'evaluate'
    })
  },

  deleteTapEvent: function (e) {
    this.setData({
      currentTab: 'delete'
    })
  },


  evaluateContextTapEvent : function (e) {
    wx.navigateTo({
      url: '../../pages/evaluate_context/evaluate_context'
    })
  },

  couponsTapEvent : function(e) {
    wx.navigateTo({
      url: '../../pages/coupons/coupons'
    })
  },

  balanceTapEvent: function () {
    wx.navigateTo({
      url: '../../pages/balance/balance',
    })
  },

})