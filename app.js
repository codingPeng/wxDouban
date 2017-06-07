// 小程序逻辑
App({
    onLaunch() {
        let _this = this;
        wx.getSystemInfo({
            success(res) {
            }
        });
        wx.redirectTo({
            url: `/pages/home/index`
        })
    },
    api: 'https://api.douban.com'
})
