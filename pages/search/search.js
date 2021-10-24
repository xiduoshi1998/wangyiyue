// pages/search/search.js
import request from '../utils/request'
let isSend=false
Page({

  /**
   * 页面的初始数据
   */
  data: {
         placeholderContent:'' , //默认搜索框的关键字
        hotList:[] ,       //热搜榜数据
        searchContent:'' ,//表单项的动态数据
        searchList:[],
        historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getSearchDefault();
     this.getHotList()
  },
  // 搜索框默认关键字接口
  getSearchDefault(){
    request('/search/default').then(res=>{
     this.setData({
       placeholderContent:res.data.realkeyword
     })
    })
    
  },
  // 热搜榜
  getHotList(){
request("/search/hot/detail").then(res=>{
        this.setData({
          hotList:res.data
        })
})

  },

  // 搜索改变回调
  handleInput(event){
    this.setData({
      searchContent:event.detail.value.trim()
    })
this.throttle(this.getSearchchList,300)
  
  } ,
//  关键字模糊匹配请求
getSearchchList(){
  if(!this.data.searchContent){
    this.setData({
      searchList:[],

    })
    return;
  }
  let{searchContent, historyList}=this.data
  request('/search/suggest',{keywords:this.data.searchContent,limit:10}).then(res=>{
    this.setData({
      searchList:res.result.songs
    })
  })
     historyList.unshift(searchContent)
     this.setData({
       historyList
     })
},
// 节流
throttle(fun,time){
  if(isSend){
    return
  }
  isSend=true
  fun()
  setTimeout(()=>{
   isSend=false
  },time)
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