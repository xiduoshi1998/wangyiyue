
import config from './config'
// 封装函数
export default (url,data={},methods='GET')=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.mobileHost+url,
      data,
      methods,
      header:{
        // 携带cookie 发送请求
       cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item=>
         item.indexOf("MUSIC_U") !== -1
       ):''
      },
      success:(res)=>{
        if(data.isLogin){
          // 判断当前请求是否有cookies 如果有就保存到本地
             wx.setStorage({
                key:"cookies",
                data:res.cookies
             })
        }
         resolve(res.data)
       },
       fail:(err)=>{
        reject(err)
       }
    })
  })
}
