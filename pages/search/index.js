const app = getApp();
Page({
    data: {
        renderData: [],
        loading: true,
        inputVal: '',
        winHeight: 0
    },
    getInputVal(e) {
        this.setData({
            inputVal: e.detail.value // 获取input的值
        })
    },
    searchMovie() {
        let _this = this;
        let { renderData, inputVal, loading } = this.data;
        console.log(inputVal)
        wx.showLoading({
            title: '加载中...'
        })
        wx.request({
          url: `${app.api}/v2/movie/search?q=` + inputVal,
          method: "GET",
          header: {"content-type": "json"}, // 此时的content-type不能为 "application/json" 否则400
          dataType: "json",
          success(res) {
            wx.hideLoading();
            _this.setData({
              loading: false,
              renderData: renderData.concat(res.data.subjects)
            });

              console.log(res.data.subjects)
          },
          fail() {
              console.log("err")
          }
        })
    },
    onLoad(){
      let _this = this;
      wx.getSystemInfo({
        success(res) {
          _this.setData({
            winHeight: res.windowHeight
          })
        }
      })
    }
})