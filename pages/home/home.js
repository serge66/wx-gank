// pages/home/home.js

var page;
var mType = "all";
var mTitle = [];
var mTime = [];
var mWho = [];
var mSrc = [];
var mContentType = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    title: "All",
    system: {},
    items: [],
    tabName: 'All',
  },
  _tap_menu: function(e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  _bindtap_one: function() {
    console.log("ssssssssss")
    this.setData({
      open: false,
      tabName: 'All',
      title: "All"
    });
  },
  _bindtap_two: function() {
    console.log("dddddd")
    this.setData({
      open: false,
      tabName: 'Android',
      title: "Android"
    });
    
  },
  _bindtap_three: function() {
    console.log("ffffff")
    this.setData({
      open: false,
      tabName: 'iOS',
      title: "iOS"
    });
    
  },
  _bindtap_four: function() {
    console.log("ggggggg")
    this.setData({
      open: false,
      tabName: 'JS',
      title: "JS"
    });
    // this.selectComponent('#component-js')._refreshData()此代码可被下方代码代替
    // wx.startPullDownRefresh();
  },
  _bindtap_five: function() {
    console.log("ffffffff")
    this.setData({
      open: false,
      tabName: 'Girl',
      title: "Girl"
    });
  },
  _bindtap_six: function() {
    console.log("ffffffff")
    this.setData({
      open: false,
      tabName: 'Video',
      title: "Video"
    });
  },
  _bindtap_seven: function() {
    console.log("ffffffff")
    this.setData({
      open: false,
      tabName: 'Recommendation',
      title: "Recommendation"
    });
  },
  _bindtap_eight: function() {
    console.log("ffffffff")
    this.setData({
      open: false,
      tabName: 'Resources',
      title: "Resources"
    });
  },
  _bindtap_nine: function() {
    console.log("ffffffff")
    this.setData({
      open: false,
      tabName: 'App',
      title: "App"
    });
  },
  _bindtap_ten: function() {
    console.log("ffffffff")
    this.setData({
      open: false,
      tabName: 'About',
      title: "About"
    });
  },
  _tap_search: function() {

  },
  _clickItem: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '../detail/detail?src=' + event.currentTarget.dataset.src,
    });
  },
  _loadData: function(aType, num, isImage) {
    var that = this
    wx.request({
      url: `http://gank.io/api/data/${aType}/10/${num}${(isImage ? '?imageView2/0/w/100' : '')}`,
      showLoading: true,
      success: (res) => {
        console.log(res.data.results)
        wx.stopPullDownRefresh()
        if (!res.data.error) {
          // var _items = that.data.items
          if (page == 1) {
            mTime = []
            mTitle = []
            mWho = []
            mSrc = []
            mContentType = []
            // _items = res.data.results
            // wx.stopPullDownRefresh()
          }
          var i = 0;
          for (; i < res.data.results.length; i++)
            bindData(res.data.results[i])

          var itemList = [];
          for (var i = 0; i < mTitle.length; i++) {
            itemList.push({
              desc: mTitle[i],
              who: mWho[i],
              time: mTime[i],
              contentType: mContentType[i],
              src: mSrc[i]
            })
          }

          that.setData({
            items: itemList
          })
          // console.log(that.data.items)
          // loadMoreView.loadMoreComplete(res)
        } else {

        }
      },
      fail: () => {
        wx.stopPullDownRefresh()
        if (page != 0) {
          // loadMoreView.loadMoreFail()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // page = 1
    // wx.setNavigationBarTitle({
    //   title: "首页"
    // })
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          system: res
        })
      }
    })
    wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("width:" + this.data.system.windowWidth)
    console.log("height:" + this.data.system.windowHeight)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("用户下拉了....")

    if (this.data.tabName == 'All') {
      page = 1;
      this._loadData(mType, page, false)
    } else {
      this.selectComponent('#component-js')._refreshData()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("触发上拉加载动作22222....")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  _bindtap_lower: function() {
    console.log("触发上拉加载动作....")

    if (this.data.tabName == 'All') {
      page++
      this._loadData(mType, page, false)

      // wx.showToast({
      //   title: 'onReachBottom',
      //   icon: 'none',
      //   duration: 600
      // });
    } else {
      this.selectComponent('#component-js')._loadMoreData()
    }

  },
  //自定义组件调用的方法,暂时未用 2018-11-29 10:24:56
  onMyEvent: function(e) {
    console.log("onMyEvent-- ")
    e.detail // 自定义组件触发事件时提供的detail对象
    event.currentTarget.dataset.src
  }
})

function bindData(itemData) {
  mTitle.push(itemData.desc);
  mTime.push(itemData.publishedAt.split("T")[0]);
  mWho.push(itemData.who);
  mContentType.push(itemData.type);
  mSrc.push(itemData.url);

  // console.log(mTitle)
  // console.log(mTime)
  // console.log(mWho)
  // console.log(mContentType)
  // console.log(mSrc)
}