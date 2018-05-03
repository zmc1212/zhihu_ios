//answer.js
var util = require('../../utils/utils.js')

var app = getApp()
console.log(app.globalData.followpeple);
Page({
  data: {
    motto: '知乎--微信小程序版',
    userInfo: {},
    animation:''
  },
  //事件处理函数
  toQuestion: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    }),
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            scrollHeight: res.windowHeight,
          });
        }
      });
  },
  onReady:function(){
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'left top 0',
      success: function (res) {

      }
    })
  },
  hidefooter:function(){
    this.animation.opacity(0).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  showfooter: function () {
    this.animation.opacity(1).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  upper: function () {
    //在标题栏中显示加载
    wx.showNavigationBarLoading()
    this.hidefooter();
    setTimeout(function () {
      //完成停止加载
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000);
    wx.showToast({
      title: '上啦',
      icon: 'loading',
      duration: 1000
    });
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading();  }, 1000);
    this.showfooter();
    wx.showToast({
      title: '下啦',
      icon: 'loading',
      duration: 1000
    });
  },
  tapName: function (event) {
  
  }
})
