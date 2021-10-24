// 歌单详情数据请求地址
import request from './request'
//歌曲详情
export function getMusicListDetail(item){
return request('/song/detail',{ids:item})
}
