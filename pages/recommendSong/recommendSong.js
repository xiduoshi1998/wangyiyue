// pages/recommendSong/recommendSong.js
import request from '../utils/request'
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendSongList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getRecommendSong()
  },
  // 获取每日推荐歌曲
  getRecommendSong(){
request('/recommend/songs').then(res=>{
this.setData({
  recommendSongList:res.data.dailySongs
})
})
  },
  // 跳转播放页
  toSongDetail(event){
    let {song,index}=  event.currentTarget.dataset;
    this.setData({
     index
    })
wx.navigateTo({
  url: '/pages/songDetail/songDetail?mid='+song.id+'',
})
  },
  // 播放全部
 pushMusicList(){
  appInstance.playMusicList(this.data.recommendSongList)
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})