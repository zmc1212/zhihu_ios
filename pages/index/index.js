var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/utils.js');
Page({
  data: {
    tabs: ["关注", "推荐", "热榜"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0, 
    sliderW:0,
    feed:[],
    feed_length: 0,
    scrollHeight:0,
    follows:[],
    follow_length:0
  },
  onLoad: function () {
    var that = this;
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    this.getData();
    this.getFollowData();
    wx.getSystemInfo({
      success: function (res) { 
        that.setData({
          scrollHeight: res.windowHeight,
          sliderLeft: that.data.sliderW,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  onReady: function(){
    var _this = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('.sliderW').boundingClientRect()
    query.exec(function (res) {
      //res就是 该元素的信息 数组
      //console.log(res);
      //取高度
      _this.setData({
        sliderW: res[0].width,
        realHeight: res[0].height
      });
      //console.log('取高度', _this.data.realHeight);
    })
  },
  //navbar切换事件
  tabClick: function (e) {
    // console.log(e.currentTarget.id)
    // var selId = e.currentTarget.id
    // console.log(selId);
    // var that = this
    // wx.getSystemInfo({
    //   success: function (res) {
    //     if (selId == 0 || selId == 2) {
    //       that.setData({
    //         scrollHeight: 0,
    //       });
    //     } else {
    //       that.setData({
    //         scrollHeight: res.windowHeight
    //       });
    //     }
    //   }
    // });
   
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //事件处理函数
  bindItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  upper: function () {
    //在标题栏中显示加载
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
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
      duration: 2000
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
        duration: 2000
      })
    }, 2000)

  },

  //使用本地 feed数据实现继续加载效果
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
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
        duration: 2000
      })
    }, 3000)
  },
  getData: function () {
    var feed = util.getData2();
    var feed_data = feed.data;
    console.log(feed_data)
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },
  getFollowData:  function(){
    var follows = util.getfollow();
    console.log('ggg');
    var follow_data = follows.data;
    this.setData({
      follows: follow_data,
      follow_length: follow_data.length
    });
    console.log(follows.data)
  }
});