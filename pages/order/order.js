// pages/order/order.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hairId: '',
        hairName: '',
        shopId: '',
        shopName: '',
        itemArray: [],
        itemArrayName: [],
        itemId: '',
        index: 0,
        date: '2016-09-01',
        time: '12:01',
        money: '130.00',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            hairId: options.hairId,
            hairName: options.hairName,
            shopId: options.shopId,
            shopName: options.shopName,
        })
        this.getItem()
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

    bindPickerChange: function (e) {
        var that = this
        this.setData({
            index: e.detail.value,
            itemId: that.data.itemArray[e.detail.value].id
        })
        console.log(that.data.itemArray[e.detail.value].id)
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        }),
            this.pickTimeEvent()
    },

    pickTimeEvent: function () {

    },

    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },


    commitOrderEvent: function () {
        var that = this
        app.http.request({
            url: "orders/mader",
            header: {
                'content-type': 'application/json',
                'authorization': "Bearer " + app.globalData.token,
            },
            method: "POST",
            data: {
                "createdate": "2017-12-09 12:35:11",
                "hairdressId": this.data.hairId,
                "hairdressName": this.data.hairName,
                "itemId": this.data.itemId,
                "itemName": this.data.itemArray[this.data.index].name,
                "mkTime": this.data.date + " " + this.data.time + ":00",
                "phone": "15816140012",
                "price": this.data.money,
                "shopId": this.data.shopId,
                "shopName": this.data.shopName
            },
            success: function (res) {
                console.log(res)
            }
        })
    },

    getItem: function () {
        var that = this
        app.http.request({
            url: "items/list",
            header: {
                'content-type': 'application/json',
                'authorization': "Bearer " + app.globalData.token,
            },
            method: "POST",
            data: {
                "page": 1,
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
                var array = []
                for (var i = 0; i < res.data.rows.length; i++) {
                    array.push(res.data.rows[i].name)
                }
                that.setData({
                    itemArray: res.data.rows,
                    itemArrayName: array,
                    itemId: res.data.rows[0].id
                })
                console.log(that.data.itemArrayName)
            }
        })
    }
})