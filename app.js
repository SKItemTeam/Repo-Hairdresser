//app.js 
var util = require('/utils/util.js')
App({
    onLaunch: function () {
        var that = this
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        // wx.login({
        //     success: loginCode => {
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //         if (loginCode.code) {
        //             wx.request({
        //                 url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc71c4fcdedf1c22f&secret=70cc39a484c94014e56dc87f818de60f&js_code=' + loginCode.code + '&grant_type=authorization_code',
        //                 data: {
        //                     code: loginCode.code
        //                 },
        //                 success: function(res) {
        //                     console.log(res.data);
        //                     that.globalData.openid = res.data.openid;
        //                     that.globalData.session_key = res.data.session_key;
        //                 },
        //                 fail: function(event) {

        //                 },
        //                 complete: function() {

        //                 }
        //             })
        //         } else {
        //             console.log('获取用户登录状态失败！' + res.Msg)
        //         }
        //     }
        // })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        openid: "",
    },

    http: require('/utils/request.js')
})