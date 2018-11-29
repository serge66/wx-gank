// components/itemcomponent/itemcomponent.js


var page;
var mType = "前端";
var mTitle = [];
var mTime = [];
var mWho = [];
var mSrc = [];
var mContentType = [];

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    system: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _clickItem: function(event) {
      console.log(event)
      wx.navigateTo({
        url: '../detail/detail?src=' + event.currentTarget.dataset.src,
      });

      // console.log("methods-- _clickItem")
      // var myEventDetail = {} // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    _loadMoreData: function(e) {
      console.log("_loadMoreData")

      page++
      this._loadData(mType, page, false)

    },
    _refreshData: function(e) {
      console.log("_refreshData")
      // wx.startPullDownRefresh();
      page = 1;
      this._loadData(mType, page, false)
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
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
    moved: function() {},
    detached: function() {},
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {},
    hide: function() {},
    resize: function() {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      var that = this
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            system: res
          })
        }
      })
    },
  },
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