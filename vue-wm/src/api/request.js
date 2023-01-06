//二次封装axios
import axios from 'axios';
const baseUrl = '';
class HttpRequest {
    constructor(baseUrl)
    {
        this.baseUrl = baseUrl;
    }

    getInsideConfig(){
        const config = {
            baseUrl:this.baseUrl,
            header:{}
        }
        return config;
    }

    //拦截器
    interceptors(instance){
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
          }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });
       
          // 响应拦截器
          instance.interceptors.response.use(function (response) {
            //console.log(response);
            const { code,data } = response.data;
            if(code === 200)
            {
                //console.log("response=",response);
                return data;
            }
            else
            {
                //错误处理
            }
          }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
          });
    }


    request(options){
        const instance = axios.create();
        options = {...this.getInsideConfig(),...options};
        this.interceptors(instance);
        return instance(options);
    }
}
export default new HttpRequest(baseUrl);