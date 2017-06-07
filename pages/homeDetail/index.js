// index.js 逻辑
const app = getApp();
Page({
  data: {
    rData: {},
    loading: true
  },
  initData(optionId) {
    let _this = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + optionId,
      header: {
        'Content-Type': 'json'
      },
      success(res){
        console.log(res.data);
       _this.setData({
          loading: false,
          rData: res.data
        });
       let title = res.data.title;
       wx.setNavigationBarTitle({title});
      }
    });
  },
  onLoad(options) {
    this.initData(options.id);
  }

});