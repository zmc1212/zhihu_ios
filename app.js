/**
 * @fileOverview 微信小程序的入口文件
 */

var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');

//app.js
App({
  /**
   * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
   */
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl);
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  followyou: function () {
    wx.showToast({
      title: '关注成功',
      icon: 'success',
      duration: 1000
    })
    this.globalData.followpeple++;
  },
  globalData: {
    userInfo: null,
    followpeple:0
  }
})