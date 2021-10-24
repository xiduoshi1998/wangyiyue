App({
  globalData:{
    // 全局保存播放状态 和播放id
     isMusicPlay:false,
     musicId:'',
     musicId2:[] , //歌单列表id
     musicPlayList:[]
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },
  // 播放全部
  playMusicList(list){
    this.globalData.musicId2=[];
    this.globalData.musicPlayList=[]
    for(let i of list){
     this.globalData.musicPlayList.push(i)
   this.globalData.musicId2.push(i.id+'')
    }
    let id=this.globalData.musicPlayList[0].id
   wx.navigateTo({
  url: '/pages/songDetail/songDetail?mid='+id,
})
},

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
