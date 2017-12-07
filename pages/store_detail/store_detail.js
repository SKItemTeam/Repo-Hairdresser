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
        storeDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            storeId: options.id
        })
        this.getStoreDetail()
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

    getStoreDetail: function() {
        var that = this
        app.http.request({
            url: "shops/" + that.data.storeId,
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
                    storeDetail: res.data
                })
                console.log(that.data.storeDetail)
            }
        })
    }
})