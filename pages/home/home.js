// pages/home/home.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: "left",
        storeList: [],
        hairdresserList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getList()
        this.testFunc()
        this.getStoreList()
        this.getHairdresserList()
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
    tabEvent: function (e) {
        var that = this
        if (e.currentTarget.dataset.tab == 'left') {
            that.setData({
                currentTab: 'left'
            })
        }
        else if (e.currentTarget.dataset.tab == 'right') {
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

    testFunc: function () {
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
    },

    stores_detail_info: function (e) {
        console.log(e)
        wx.navigateTo({
            url: '../../pages/store_detail/store_detail?id=' + e.currentTarget.dataset.id
        })
    },

    haires_detail_info: function (e) {
        wx.navigateTo({
            url: '../../pages/hair_detail/hair_detail?id=' + e.currentTarget.dataset.id
        })
    },

    getStoreList: function () {
        var that = this
        app.http.request({
            url: "shops/10/1",
            header: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + app.globalData.token,
            },
            method: "POST",
            data: {
                "keyStr": "",
                "latitude": "23.372223",
                "longitude": "116.718995",
                "range": "1.5"
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    storeList: res.data.list
                })
                console.log(that.data.storeList)
            }
        })
    },

    getHairdresserList: function () {
        var that = this
        app.http.request({
            url: "hairdressers/10/1",
            header: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + app.globalData.token,
            },
            method: "POST",
            data: {
                "keyStr": "",
                "latitude": "23.372223",
                "longitude": "116.718995",
                "range": "1.5"
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    hairdresserList: res.data.list
                })
                console.log(that.data.hairdresserList)
            }
        })
    }
})