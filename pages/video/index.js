Page({
    data: {
        winHeight: 0,
        videoList: [],
        loading: false
    },
    onLoad() {
        let _this = this;
        wx.getSystemInfo({
          success(res) {
            _this.setData({
              winHeight: res.windowHeight
            })
            console.log("高度：" + res.windowHeight)
          }
        });
        wx.request({
            url: 'http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&fn=3&passport=JcFEbJV42ahS7jdcT9vZpbA4%2F9KVLFYQL80lbIO6OE1JIqQNgfEC%2FWRVAHVu3xy3rqJv2nCCD2QqQsfBWgSZWQ%3D%3D&devId=Mk119XLnjjUmJ6L3FxYE3ryK4ttyviIGCzbI3myChofd37V%2Fodl6EmNCrUxTtHG2&offset=0&size=30&version=18.0&spever=false&net=wifi&lat=BFUoxL%2F37rMI%2Fv9MpBUrRg%3D%3D&lon=pUmKDmBKaGKeuh74DI4nrQ%3D%3D&ts=1483975657&sign=Evgvdo%2Blfo0JhrbmusywkPe6IIvG%2BTsT0TMucZfhKut48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
            method: 'GET',
            header: {'Content-type': 'json'},
            dataType: 'json',
            success(res) {
                console.log(res.data)
                _this.setData({
                    videoList: res.data.视频,
                    loading: true
                })
            }
        })
    }
})