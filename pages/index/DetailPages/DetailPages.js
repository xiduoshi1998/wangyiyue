// pages/index/DetailPages/DetailPages.js
import request from './../../utils/request';
import {getMusicListDetail} from '../../utils/music'
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList:[] ,//歌单详情  
    musicDetailList:[] ,//歌曲详情
    listId:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 this. getMusicList(options.mid);
  },
  getMusicList(id){
      request('/playlist/detail',{id}).then(res=>{
        // 歌曲id
        let  musicDetailList=[];
        for(let i of res.playlist.trackIds){
          musicDetailList.push(i.id)
        }
       this.setData({
        musicList:res.playlist,
        listId :musicDetailList
      })
      // 歌曲详情
      return getMusicListDetail(musicDetailList.toString())
      }).then(res=>{
        this.setData({
          musicDetailList:res.songs
        })
      })
  },
  // 歌曲播放
  PlayMusic(event){
    let id=  event.currentTarget.id
   wx.navigateTo({
     url: '/pages/songDetail/songDetail?mid='+id+'',
   })
  },
  // 播放全部
  playMusicList(){
    appInstance.playMusicList(this.data.musicDetailList)&&this.data.musicList
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