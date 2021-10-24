// pages/login/login.js
import request from '../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
      phone:'', //手机号
      password:'' //密码
  },
  // 表单发生改变触发
  handleInput(e){
    // 判断哪个表单触发了这个事件
   let type = e.currentTarget.id;
         this.setData({
        [type]:e.detail.value
         })
  },
 async login(){
       let {phone,password}=this.data;
      //  前端验证
       if(!phone){
         wx.showToast({
           title: '手机号不能为空',
           icon:'none'
         })
         return
        };
      //正则表达式
      let phoneReg=/^1[3-9]\d{9}$/
       if(!phoneReg.test(phone)){
        wx.showToast({
          title: '手机号错误',
          icon:'none'
        })
        return
       };
       if(!password){
        wx.showToast({
          title: '密码不能为空',
          icon:'none'
        })
        return
       }

      //  后端验证

   const result= await  request('/login/cellphone',{
       phone,
      password,
      isLogin:true
      })
      if(result.code!==200){
        wx.showToast({
          title: result.msg,
          icon:'none'
        })
      }else if(result.code==200){
        wx.showToast({
          title: '登录成功',
        })
        // 保存用户信息至本地
        wx.setStorageSync('token',JSON.stringify(result.token))
        wx.setStorageSync('userInfo', JSON.stringify(result.profile))
              // 登录成功
         wx.reLaunch({
           url: '/pages/personal/personal',
         })

      }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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