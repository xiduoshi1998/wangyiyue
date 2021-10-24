// pages/musicSquare/musicSquare.js
import request from '../../pages/utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
       categories:[],//分类列表
       categoryIndex:5001 ,
       category:[],//分类下的歌单
       categoryName:'', //当前分类的名字
       limit:60
  },

  // 歌单分类
 async getMusicCategories(){
  const res= await  request('/playlist/hot');
  this.setData({
    categories:res.tags
  })
  },

  giveIndex(event){
 let {name}=event.currentTarget.dataset
this.setData({
  categoryIndex:event.currentTarget.id
})
 this.getCategories(name)
  },

  // 获取分类歌单
 async getCategories(cat,limit=60){
  let res= await request(`/top/playlist`,{cat,limit});
  res.playlists.map(item=>{
 let playCount= Math.round(item.playCount/10000).toString()
 if(playCount.length<5){
  return item.playCount= playCount+'万'
 }
 item.playCount= Math.round(playCount/10000)+'亿'
 })
     this.setData({
       category:res.playlists,
       categoryName:res.cat,
       limit:res.playlists.length,
     })
  },
  
  // 触底加载更多
  handTopLower(){
    let {categoryName,limit}=this.data
   this.getCategories(categoryName,limit*2)
},
  // 进入详情页
  DetailPage(event){
  let {id} = event.currentTarget;
  wx.navigateTo({
    url: '/pages/index/DetailPages/DetailPages?mid='+id,
  })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getMusicCategories()
   this.getCategories('华语')
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