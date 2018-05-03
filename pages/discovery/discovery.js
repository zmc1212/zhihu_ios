var app = getApp();
var util = require('../../utils/utils.js');
Page({
  data: {
    tabslist: ["关注", "推荐", "热榜"],
    tabscontent:['follows','feed',''],
    follows:[],
    feed: [],
    feed_length: 0,
    scrollHeight: 0,
    flag:true,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }]
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    this.getData();
    this.getFollowData(0,4);
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
          //减去的200rpx为header和line还有tab栏的高度，如果此高度计算不准确会造成页面多出一个纵向滚动条
        var calc = clientHeight * rpxR - 200;
        that.setData({
          winHeight: calc,
          scrollHeight: res.windowHeight,
        });
      }
    });
  },
  getData: function () {
    var feed = util.getData2();
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },
  getFollowData: function (start,end) {
    var follows = util.getfollow();
    var follow_data = follows.data.slice(start,end);
    this.setData({
      follows: follow_data,
      follow_length: follow_data.length
    });
  },
  followyou:function(){
   app.followyou();
  },
  change:function(){
    var changeNum = [0,4];
    var changeNum2 = [4,8];
   // console.log(this.data.flag);
    if (this.data.flag==true){
       this.getFollowData(changeNum2[0], changeNum2[1]);
       this.data.flag = false;
    }else {
      this.getFollowData(changeNum[0], changeNum[1]);
      this.data.flag = true;
    }
  },
  tofeed:function(){
    this.setData({
      currentTab: 1
    })
  },
  //事件处理函数
  bindItemTap: function () {
    console.log(111222);
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  upper: function () {
    //在标题栏中显示加载
    wx.showNavigationBarLoading()
    console.log("upper");
    this.refresh();
    setTimeout(function () {
      //完成停止加载
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  refresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 1000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1000
      })
    }, 1000)

  },
  //使用本地 feed数据实现继续加载效果
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 1000
      })
    }, 1000)
  },
  footerTap: app.footerTap
})