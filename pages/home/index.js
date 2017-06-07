// index.js
// 获取应用实例
const app = getApp();
Page({
  data: {
    tab: "0",
    loading: true,
    winWidth: 0,
    winHeight: 0,
    swiperHeight: 0,
    renderData: [],
    isDisplay: 'none',
    loadText:"加载更多",
    pageIndex: 1,
    tabs: [
    {
      id: '0',
      label: '正在热映',
      url: '/v2/movie/in_theaters'
    },
    {
      id: '1',
      label: '即将上映',
      url: '/v2/movie/coming_soon'
    },
    {
      id: '2',
      label: 'Top250',
      url: '/v2/movie/top250'
    },
    {
      id: '3',
      label: '北美票房榜',
      url: '/v2/movie/us_box'
    },
    ]
  },
  tabTap(event) {
    let tab = event.target.id;
    this.setData({
      tab,
      renderData: [],
      loading: true
    });
    let title = this.data.tabs.find(item => item.id === tab).label;
    let url = this.data.tabs.find(item => item.id === tab).url;
    this.initHome(url);
    wx.setNavigationBarTitle({title})
  },
  initHome(apiUrl) {
    let { renderData } = this.data;
    let _this = this;
    console.log(apiUrl)
    wx.request({
      url: `${app.api}${apiUrl}`,
      method: "GET",
      header: {"content-type": "json"}, // 此时的content-type不能为 "application/json" 否则400
      dataType: "json",
      success(res) {
        _this.setData({
            loading: false,
            swiperHeight: 79 * res.data.subjects.length + 84, // 动态设置swiper-item的高度
            renderData: res.data.subjects,
            isDisplay: "flex"  // 设置加载更多此时显示
          });
          console.log(res.data)
      },
      fail() {
          console.log("err")
      }
    })
  },
  durationChange(event) {
    let tab = event.detail.current.toString();
    this.setData({
      tab: tab,
      renderData: [],
      loading: true
    });
    console.log(this.data)
    let title = this.data.tabs.find(item => item.id === tab).label;
    let url = this.data.tabs.find(item => item.id === tab).url;
    this.initHome(url);
    wx.setNavigationBarTitle({title})
  },
  //加载更多 
  setLoading(){ 
     let renderDataBefore = this.data.renderData
     let swiperHeightBefore = this.data.swiperHeight;
     let that = this
     wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中” 
      title: '加载中'
    }) 
     that.setData({
        loadText:"数据请求中", 
        loading: true,
     });
     wx.request({ 
      url: `${app.api}/v2/movie/in_theaters`, 
      method: 'GET',
      header: {"content-type": "json"}, // 此时的content-type不能为 "application/json" 否则400
      dataType: "json",
      success(res) { 
        console.log(renderDataBefore.concat(res.data.subjects).length) //打印拼接之后数据 
        wx.hideLoading();
        that.setData({ 
          swiperHeight: swiperHeightBefore + 79 * res.data.subjects.length,
          renderData:renderDataBefore.concat(res.data.subjects), 
          loadText:"加载更多", 
          loading: false,
          isDisplay: "flex"
        }) 
      } 
    }) 
  },
  onLoad() {
    let _this = this;
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    });
    this.initHome('/v2/movie/in_theaters');
  }
});