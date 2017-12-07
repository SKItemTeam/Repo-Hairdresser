// pages/appointment/appointment.js
Page({
    data: {

    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.info("1");
        this.getStoreList();
    },
    onReady: function () {
        // 页面渲染完成
        console.info("1");
    },
    onShow: function () {
        // 页面显示
        console.info("1");
    },
    onHide: function () {
        // 页面隐藏
        console.info("1");
    },
    onUnload: function () {
        // 页面关闭
        console.info("1");
    },

    /***********************************************************
     * 自定义函数区
     ***********************************************************/

    // 地图导航
    //navEvent: function (e) {
    //  console.info("0");
    //}
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
                "keyStr": "发廊",
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
    }
})