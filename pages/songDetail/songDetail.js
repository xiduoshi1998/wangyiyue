// pages/village/village.js
import request from '../utils/request'
import {getMusicListDetail} from '../utils/music'
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isPlay:false  ,//音乐是否播放
    song:{} , //歌曲详情
    musicLink:'' , //音乐的url
    currentTime:'00:00',  //实时时间
    durationTime:'00:00' , //总时长
    currentWidth:0,   //实时进度条
    musicList:[] ,      //歌单列表
     isMusicList:false, //歌单显示与隐藏
     musicListNum:0  , //歌单数量
     index:0   //歌单列表当前播放的index
  },
  // 点击播放暂停
  musicPlay(){
    let isPlay=!this.data.isPlay;
    let {musicId,musicLink}=this.data;
    this.musicControl(isPlay,musicId,musicLink);
  },
  // 音乐功能暂停/播放
 async musicControl(isPlay,id,musicLink){
     if(isPlay){
    if(!musicLink){ //判断是否已经有url
    let musicLinkData=  await request('/song/url',{id})
    let musicLink=musicLinkData.data[0].url
    this.setData({
      musicLink
    })
    }
      // 1 音乐播放的实例 2 配置实例src title必填 
       this.backgroundAudioManager.title=this.data.song.name
      this.backgroundAudioManager.src=this.data.musicLink
     }else{
        this.backgroundAudioManager.pause()
     }
  },
  // 获取音乐详情
  getMusicDetail(ids){
    // 播放列表 /播放id
    let musicPlayList= appInstance.globalData.musicPlayList;
    let musicId2= appInstance.globalData.musicId2;
    getMusicListDetail(ids).then(res=>{
      // 歌单列表 
      if(musicId2.indexOf(ids)===-1){
       musicId2.unshift(ids)
      musicPlayList.unshift(res.songs[0])
      }
      this.setData({
        song:res.songs[0],
        durationTime:this.formattingTime(res.songs[0].dt), //过滤时间
        musicListNum:musicPlayList.length,
        musicList:musicPlayList
      })
         // 动态修改窗口标签
    wx.setNavigationBarTitle({
      title:res.songs[0].name,
    })
    })
      
  },
  // 修改页面状态功能函数
  changePlayState(isPlay){
    this.setData({
  isPlay
    })
    // 保存播放状态
    appInstance.globalData.isMusicPlay=isPlay
  },
  // 上下首播放
  handSwitch(event){
    let type=event.currentTarget.id
    this.backgroundAudioManager.stop()
    let {musicList,index}=this.data;
    if(type==='next'){
      (index===musicList.length-1)&&(index=-1)
      index +=1
    }else{
      (index===0)&&(index=musicList.length)
      index -=1
    }
    // 更新index
 this.setData({
  index
 })
 let musicId=musicList[index].id
     this.getMusicDetail(musicId+'')
    this.musicControl(true,musicId)
  },
  // 格式化时间
  formattingTime(value) {
    let result = parseInt(value/1000)
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    result = `${m}:${s}`
    return result
  },

  // 歌曲列表
  musicList(){
   if(!this.data.isMusicList){
    this.setData({
      isMusicList:true
    })
   }
  },
  none(){
    if(this.data.isMusicList){
      this.setData({
        isMusicList:false
      })
    }
  },
  // 点击列表播放音乐
  musicPlay2(event){
    //当前点击音乐列表的id /index
 let index=event.currentTarget.dataset.index;
 let  ismusicId=event.currentTarget.id;
    this.setData({
      ismusicId,
      index
    })
    this.getMusicDetail(ismusicId);
    this.musicControl(true,ismusicId);
  },

  // 删除歌曲
  deleteMusic(event){
    console.log(11);
  //  let index=event.currentTarget.dataset.index
  //  appInstance.globalData.musicPlayList.splice(index,1);
  //  this.backgroundAudioManager.stop();
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 小程序传参有长度限制 会截掉过长的部分
this.getMusicDetail(options.mid);
this.musicControl(true,options.mid)

// 判断是否在播放 在播放就修改播放状态为true
if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId===options.mid){
          this.setData({
            isPlay:true
          })
}

// 音乐的实例
this.backgroundAudioManager=wx.getBackgroundAudioManager();
// 保持页面 和后台的播放 暂停 一致性
// 监听音乐的播放
this.backgroundAudioManager.onPlay(()=>{
      // 修改音乐是否播放状态
      this.changePlayState(true)
      appInstance.globalData.musicId=options.mid
})
// 监听音乐的暂停
        this.backgroundAudioManager.onPause(()=>{
          this.changePlayState(false)
        })
  // 监听音乐的停止
  this.backgroundAudioManager.onStop(()=>{
   this.changePlayState(false)
  })
  // 音乐播放结束
  this.backgroundAudioManager.onEnded(()=>{
         // 切换下一首 自动播放
    let {musicList,index}=this.data
   if(index===musicList.length-1){
         index=-1
   }
   this.setData({
     index
   })
   let musicId=musicList[index+1].id
  // 关闭当前音乐
  this.backgroundAudioManager.stop();
  // 最新的歌曲信息
  this.getMusicDetail(musicId+'');
  // 自动播放最新音乐
  this.musicControl(true,musicId);
    this.setData({
      currentWidth:0,
      currentTime:'00:00'
    })
   })
  // 监听音乐实时播放的时间
  this.backgroundAudioManager.onTimeUpdate(()=>{
    //this.backgroundAudioManager.currentTime  总的时间
    //this.backgroundAudioManager.duration     当前时间
  // 总时间-当前时间*总的进度条长度==进度条当前的宽度
 let  currentTime= this.formattingTime(this.backgroundAudioManager.currentTime*1000)
 let  currentWidth=this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration*450
 this.setData({
  currentTime,
  currentWidth
 })
  })
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