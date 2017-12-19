// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'none',
    isGetAppointment: false,
    isGetInService: false,
    isGetComplete: false,
    isGetEvaluate: false,
    isGetDelete: false,
    appointmentList: [],
    inServiceList : [],
    completeList : [],
    evaluateList : [],
    deleteList : [],
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


  payEvent: function (e) {
    var appid = "wxc71c4fcdedf1c22f"

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
      'package': 'wx2017033010242291fcfe0db70013231072',
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

  appointmentTapEvent: function (e) {
    var that = this;
    that.setData({
      currentTab: 'appointment'
    });
    if (this.data.isGetAppointment == false) {
      this.data.isGetAppointment = true
      app.http.request({
        url: "orders/making/10/0",
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "GET",
        success: function (res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].orderTime = res.data.rows[i].createdate.substring(0, 10)
            res.data.rows[i].arrvilTime = res.data.rows[i].mkTime.substring(0, 10)
          }
          that.setData({
            appointmentList: res.data.rows
          })
          console.log(that.data.appointmentList)
        }
      })
    }
  },

  in_serviceTapEvent: function (e) {
    this.setData({
      currentTab: 'in_service'
    })
    if (this.data.isGetInService == false) {
      this.data.isGetInService = true
      var that = this;
      app.http.request({
        url: "orders/servering/10/0",
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "GET",
        success: function (res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].orderTime = res.data.rows[i].createdate.substring(0, 10)
            res.data.rows[i].arrvilTime = res.data.rows[i].mkTime.substring(0, 10)
          }
          that.setData({
            inServiceList: res.data.rows
          })
          console.log(that.data.inServiceList)
        }
      })
    }
  },

  completeTapEvent: function (e) {
    this.setData({
      currentTab: 'complete'
    })
    if (this.data.isGetComplete == false) {
      this.data.isGetComplete = true
      var that = this;
      app.http.request({
        url: "orders/maked/10/0",
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "GET",
        success: function (res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].orderTime = res.data.rows[i].createdate.substring(0, 10)
            res.data.rows[i].arrvilTime = res.data.rows[i].mkTime.substring(0, 10)
          }
          that.setData({
            completeList: res.data.rows
          })
          console.log(that.data.completeList)
        }
      })
    }
  },

  evaluateTapEvent: function (e) {
    this.setData({
      currentTab: 'evaluate'
    })
    if (this.data.isGetEvaluate == false) {
      this.data.isGetEvaluate = true
      var that = this;
      app.http.request({
        url: "orders/paid/10/0",
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "GET",
        success: function (res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].arrvilTime = res.data.rows[i].mkTime.substring(0, 10)
            res.data.rows[i].totalPrice = res.data.rows[i].price - es.data.rows[i].couponValue
          }
          that.setData({
            evaluateList: res.data.rows
          })
          console.log(that.data.evaluateList)
        }
      })
    }
  },

  deleteTapEvent: function (e) {
    this.setData({
      currentTab: 'delete'
    })
    if (this.data.isGetDelete == false) {
      this.data.isGetDelete = true
      var that = this;
      app.http.request({
        url: "/orders/cancel/making/10/0",
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "GET",
        success: function (res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].orderTime = res.data.rows[i].createdate.substring(0, 10)
            res.data.rows[i].arrvilTime = res.data.rows[i].mkTime.substring(0, 10)
          }
          that.setData({
            deleteList: res.data.rows
          })
          console.log(that.data.deleteList)
        }
      })
    }
  },


  evaluateContextTapEvent: function (e) {
    wx.navigateTo({
      url: '../../pages/evaluate_context/evaluate_context'
    })
  },

  couponsTapEvent: function (e) {
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