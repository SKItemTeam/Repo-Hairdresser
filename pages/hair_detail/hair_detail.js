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
        hairdresserDetail: {}
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
        wx.navigateTo({
            url: '../../pages/order/order',
        })
    },

    getHairdresserDetail: function() {
        var that = this
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
    }
})