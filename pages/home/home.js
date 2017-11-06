// pages/home/home.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: "left"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getList()
        this.testFunc()
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

  /***********************************************************
   * 自定义函数区
   ***********************************************************/


   // 切换理发店tab和发型师tab时调用
   tabEvent: function(e) {
    var that = this
    if(e.currentTarget.dataset.tab == 'left') {
      that.setData({
        currentTab: 'left'
      })
    }
    else if(e.currentTarget.dataset.tab == 'right') {
      that.setData({
        currentTab: 'right'
      })
    }
   },

   navEvent: function (e) {
     wx.navigateTo({
       url: '../../pages/map/map'
     })
   },

    testFunc: function() {
        getApp().http.request({
            url: "auth",
            header: {
                'content-type': 'application/json'
            },
            data: {
                "credco": "123456.",
                "crednm": "admin"
            },
            method: "POST",
            success: function (res) {
                console.log(res)
            }
        })

        // wx.request({
        //     url: "http://221.5.9.254:9090/auth",
        //     header: {
        //         'content-type': 'application/json' 
        //     },
        //     data: {
        //             "credco": "123456.",
        //             "crednm": "admin"
        //     },
        //     method: "POST",
        //     success: function(res) {
        //         console.log(res)
        //     }
        // })
    }
})