Page({
    data: {
        playUrl: "",
        loading: true
    },
    onLoad(options) {
        this.setData({
            playUrl: options.id,
            loading: false
        })
    }
})