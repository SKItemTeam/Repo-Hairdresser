// pages/store_detail/store_detail.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            '/imgs/store-detail.png',
            '/imgs/store-detail.png',
            '/imgs/store-detail.png'
        ],
        storeId: '',
        storeDetail: {},
        evaluateTotleNum: '',
        evaluateList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            storeId: options.id
        })
        this.getStoreDetail()
        this.getEvaluateList()
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

    getStoreDetail: function () {
      var that = this
      app.http.request({
        url: "shops/" + that.data.storeId,
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "GET",
        success: function (res) {
          console.log(res)
          that.setData({
            storeDetail: res.data
          })
          console.log(that.data.storeDetail)
        }
      })
    },

    navEvent: function (e) {
      wx.openLocation({
        latitude: this.data.storeDetail.latitude,
        longitude: this.data.storeDetail.longitude,
        scale: 28,
        name: this.data.storeDetail.name,
        // address: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },

    getEvaluateList : function (e) {
      var that = this
      app.http.request({
        url: "metes/list",
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "POST",
        data: {
          "page": 0,
          "search": that.data.storeDetail.id,
          "size": 10,
          "sortNames": [
            "id"
          ],
          "sortOrders": [
            "ASC"
          ]
        },
        success: function (res) {
          console.log(res)
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].image0 = (res.data.rows[i].mark >= 1 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
            res.data.rows[i].image1 = (res.data.rows[i].mark >= 2 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
            res.data.rows[i].image2 = (res.data.rows[i].mark >= 3 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
            res.data.rows[i].image3 = (res.data.rows[i].mark >= 4 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
            res.data.rows[i].image4 = (res.data.rows[i].mark >= 5 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
          }
          that.setData({
            evaluateTotleNum: res.data.total,
            evaluateList: res.data.rows
          })
          console.log(that.data.evaluateList)
        }
      })
    },
})