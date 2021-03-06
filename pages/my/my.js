// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'none',
    userInfo: {},
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
    this.getUserInfo()
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

  getUserInfo : function () {
    var that = this
    app.http.request({
      url: "users",
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + app.globalData.token,
      },
      method: "GET",
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
        console.log(that.data.userInfo)
      }
    })
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
    var that = this
    that.setData({
      currentTab: 'appointment'
    })
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
  },

  in_serviceTapEvent: function (e) {
    this.setData({
      currentTab: 'in_service'
    })
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
  },

  completeTapEvent: function (e) {
    this.setData({
      currentTab: 'complete'
    })
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
  },

  evaluateTapEvent: function (e) {
    this.setData({
      currentTab: 'evaluate'
    })
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
  },

  deleteTapEvent: function (e) {
    this.setData({
      currentTab: 'delete'
    })
    var that = this;
    app.http.request({
      url: "orders/cancel/making/10/0",
      header: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + app.globalData.token,
      },
      method: "GET",
      success: function (res) {
        for (var i = 0; i < res.data.rows.length; i++) {
          //res.data.rows[i].orderTime = res.data.rows[i].createdate.substring(0, 10)
          res.data.rows[i].arrvilTime = res.data.rows[i].mkTime.substring(0, 10)
        }
        that.setData({
          deleteList: res.data.rows
        })
        console.log(that.data.deleteList)
      }
    })
  },

  evaluateContextTapEvent: function (e) {
    wx.navigateTo({
      url: '../../pages/evaluate_context/evaluate_context?shopnName=' + e.currentTarget.dataset.shopName + '&hairName=' + e.currentTarget.dataset.hairName
    })
  },

  couponsTapEvent: function (e) {
    wx.navigateTo({
      url: '../../pages/coupons/coupons?isForSelect=false'
    })
  },

  balanceTapEvent: function (e) {
    wx.navigateTo({
      url: '../../pages/balance/balance?shopName=' + e.currentTarget.dataset.shopName + '&hairName=' + e.currentTarget.dataset.hairName + '&itemName=' + e.currentTarget.dataset.itemName
    })
  },

  cancleAppointmentEvent : function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          app.http.request({
            url: "orders/cancel/" + orderId,
            header: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + app.globalData.token,
            },
            method: "DELETE",
            success: function (res) {
              console.log(res)
              that.appointmentTapEvent()
            }
          })
        } 
      }
    })
  },

  evaluateDeleteTapEvent : function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否删除待评论订单',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          app.http.request({
            url: "orders/nomete/" + orderId,
            header: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + app.globalData.token,
            },
            method: "DELETE",
            success: function (res) {
              console.log(res)
              that.evaluateTapEvent()
            }
          })
        }
      }
    })
  },

  completeOrderDeleteTapEvent: function(e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否删除订单',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          app.http.request({
            url: "orders/" + orderId,
            header: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + app.globalData.token,
            },
            method: "DELETE",
            success: function (res) {
              console.log(res)
              that.completeTapEvent()
            }
          })
        }
      }
    })
  },

  cancleOrderDeleteTapEvent: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否删除订单',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          app.http.request({
            url: "orders/" + orderId,
            header: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + app.globalData.token,
            },
            method: "DELETE",
            success: function (res) {
              console.log(res)
              that.deleteTapEvent()
            }
          })
        }
      }
    })
  },

})