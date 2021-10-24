// pages/video/video.js
import request from '../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航标签
     videoGroupList:[],
     navIndex:243123,
    //  视频数据
     VideoList:[],
     isTriggered:false , //下拉刷新
       index:1,
       uid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoGroupList();
    // this.getVideoUrl()

  },
  // 导航标签请求
  videoGroupList(){
    request('/video/group/list').then(res=>{
   this.setData({
     videoGroupList:res.data.splice(11,10),
   })
    })
    this.getVideoList(this.data.navIndex)
  },
   // 请求各导航标签下的数据
   getVideoList(navIndex,offset=0){
     let index=0
     wx.hideLoading();
   request("/video/group",{id:navIndex,offset}).then(res=>{
      this.setData({
        VideoList:res.datas.map(item=>{item.id=index++;return item}),
        isTriggered:false
      })
    })  
},

  getIndex(event){
    // 通过event传参会把number转成string
        this.setData({
          navIndex:event.currentTarget.id*1
        })    
        // 加载动画
        wx.showLoading({
          title: '正在加载',
        })
        this.getVideoList(this.data.navIndex)
  },

  // 点击进入播放页面
  playVideo(event){
    let id= event.currentTarget.id
   wx.navigateTo({
     url: '/pages/video/playVideo/playVideo?mid='+id,
   })
  },

  // 自定义下拉
  handleRefresher(){
    let index=this.data.index++
  this.getVideoList(this.data.navIndex,index)
  },

  // 下拉触底加载
  handTopLower(){
    let index=this.data.index++
    let id=this.data.navIndex
    request("/video/group",{id,offset:index}).then(res=>{
      // 第一次进来 id=='' 因为原有的id已经是id==7  再次加载从8开始
      //  下一次进来 赋值上一次的结果
     this.id;
    this.id === ''? this.id=8:this.id
      let videoListAll=res.datas.map(item=>{item.id= this.id++;return item})
     let VideoList=this.data.VideoList
     VideoList.push(...videoListAll)
     this.setData({
      VideoList
     })
    })
  },

  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
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