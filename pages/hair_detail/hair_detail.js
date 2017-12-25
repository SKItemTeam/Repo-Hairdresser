// pages/hair_detail/hair_detail.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            '/imgs/hair-detail.png',
            '/imgs/hair-detail.png',
            '/imgs/hair-detail.png'
        ],
        hairdresserId: '',
        hairdresserDetail: {},
        evaluateTotleNum: '',
        evaluateList: [],
        workList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        this.setData({
            hairdresserId: options.id
        })
        this.getHairdresserDetail()
        this.getEvaluateList()
        this.getWorkList()
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

    orderTapEvent: function () {
        var that = this
        wx.navigateTo({
            url: '../../pages/order/order?hairId=' + that.data.hairdresserDetail.id + '&hairName=' + that.data.hairdresserDetail.name + '&shopId=' + that.data.hairdresserDetail.shopId + '&shopName=' + that.data.hairdresserDetail.shopName,
        })
    },

    getHairdresserDetail: function() {
        var that = this
        console.log(app.globalData.token)
        app.http.request({
            url: "hairdressers/" + that.data.hairdresserId,
            header: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + app.globalData.token,
            },
            method: "POST",
            data: {
                "latitude": "23.372223",
                "longitude": "116.718995"
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    hairdresserDetail: res.data
                })
                console.log(that.data.hairdresserDetail)
            }
        })
    },
    
    shopDetailEvent : function () {
      wx.navigateTo({
        url: '../../pages/store_detail/store_detail?id=' + this.data.hairdresserDetail.shopId
      })
    },

    navEvent: function (e) {
      var that = this
      app.http.request({
        url: "shops/" + that.data.hairdresserDetail.shopId,
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "GET",
        success: function (res) {
          console.log(res)
          wx.openLocation({
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            scale: 28,
            name: res.data.name,
            // address: '',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      })  
    },

    getEvaluateList: function (e) {
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
          "search": that.data.hairdresserDetail.id,
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

    getWorkList : function () {
      var that = this
      app.http.request({
        url: "workses/list",
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer " + app.globalData.token,
        },
        method: "POST",
        data: {
          "page": 0,
          "search": that.data.hairdresserDetail.id,
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
          // for (var i = 0; i < res.data.rows.length; i++) {
          //   res.data.rows[i].image0 = (res.data.rows[i].mark >= 1 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
          //   res.data.rows[i].image1 = (res.data.rows[i].mark >= 2 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
          //   res.data.rows[i].image2 = (res.data.rows[i].mark >= 3 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
          //   res.data.rows[i].image3 = (res.data.rows[i].mark >= 4 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
          //   res.data.rows[i].image4 = (res.data.rows[i].mark >= 5 ? '/imgs/star_active.png' : '/imgs/star_gray.png')
          // }
          that.setData({
            workList: res.data.rows
          })
          console.log(that.data.workList)
        }
      })

      
    },
})