// pages/index/index.js
import request from '../utils/request'
import PubSub from 'pubsub-js'
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
         banner:[],
         recommendList:[],
         topList:[],  //排行榜音乐
         index:0   ,  //当前点击的index
         item:[]     //当前点击的排行榜
  },

  

  pushRecommendSong(){
    let userInfo=wx.getStorageSync('token')

 if(!userInfo){
  //  没有登录禁止进入每日推荐
  wx.showToast({
    title: '请先登录',
    icon:'none',
    success:()=>{
      // 跳转登录
     setTimeout(()=>{
      wx.navigateTo({
        url: '/pages/login/login',
      })
     },500)
    }
  })
  return
 }
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },

  // 点击进入歌单详情
  pushSonglist(event){
    let id=event.currentTarget.id
     wx.navigateTo({
       url: '/pages/index/DetailPages/DetailPages?mid='+id,
     })
  },

  // 播放排行榜音乐
  playTopList(event){
   let {item,index}= event.currentTarget.dataset
   this.setData({
    item
   }) 
    let id= event.currentTarget.id
   
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?mid='+id,
    })
  },

  musicPlaza(){
 wx.navigateTo({
  url: '/pages/musicSquare/musicSquare',
 })
  },

// 生命周期函数--监听页面加载
  onLoad: async function (options) {
    // 轮播图请求
   let bannerList= await request('/banner',{type:2})
   this.setData({
     banner:bannerList.banners
   }),
  //  推荐歌单
    request('/personalized',{limit:10}).then(res=>{
      this.setData({
        recommendList :res.result
      })
    })
    // 排行榜数据请求
    let list =[3779629,71384707,2884035,19723756,	991319590] //歌单id
    let index=0;
    let resultArr=[]
    while(index<5){
       let topListDate=await request('/playlist/detail',{id:list[index++]});
       let topListItem={name:topListDate.playlist.name,tracks:topListDate.playlist.tracks.slice(0,3)}
       resultArr.push(topListItem);
// 不需要等待全部请求再更新 获取一次渲染一次
       this.setData({
        topList:resultArr
      })
     
    };
    
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },

  //  生命周期函数--监听页面显示
  onShow: function () {

  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {

  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {

  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {

  },

  // 用户点击右上角分享
  onShareAppMessage: function () {

  }
})