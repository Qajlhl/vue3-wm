//对项目接口做一个统一的管理
import axios from "./request";
export const getHomeApi = (param)=>{
    return axios.request({
        url:'/home/getHomeData',
        method:'get',
        data:param
    })
};

//商店数据的接口
export const getStoreApi = (param)=>{
    return axios.request({
        url:'/store/getStoreData',
        method:'get',
        data:param
    })

}