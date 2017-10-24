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
   }
})