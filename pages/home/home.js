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
    tabName: 'one',
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
      tabName: 'one'
    });
  },
  _bindtap_two: function() {
    console.log("dddddd")
    this.setData({
      open: false,
      tabName: 'tow'
    });
  },
  _bindtap_three: function() {
    console.log("ffffff")
    this.setData({
      open: false,
      tabName: 'one'
    });
  },
  _bindtap_four: function() {
    console.log("ggggggg")
    this.setData({
      open: false,
      tabName: 'one'
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
      url: `http://gank.io/api/data/${aType}/40/${num}${(isImage ? '?imageView2/0/w/100' : '')}`,
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
    page = 1;
    this._loadData(mType, page, false)

    // wx.stopPullDownRefresh(); //为停止当前页面下拉刷新
    // setTimeout(function() {
    //   wx.stopPullDownRefresh()
    // }, 1000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  _bindtap_lower: function() {
    console.log("触发上拉加载动作....")
    page++
    this._loadData(mType, page, false)

    wx.showToast({
      title: 'onReachBottom',
      icon: 'none',
      duration: 600
    });
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
}