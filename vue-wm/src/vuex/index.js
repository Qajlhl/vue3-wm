import { createStore } from 'vuex';
import mutations from './mutations'
export default createStore({
    state:{
        cartList:[],
        isEdit:false,  //全选和删除编辑框是否显示
        newOrder:[],// 生成订单页面的商品列表
        userList:[
            {
                id: 1001,
                name: '张三',
                tel: '10884859686',
                province: '广东省',
                city: '深圳市',
                county: '南山区',
                addressDetail: '深圳湾',
                isDefault: true,
                areaCode: '110101',
              },
              {
                id: 1002,
                name: 'allen',
                tel: '15874859685',
                province: '湖北省',
                city: '武汉市',
                county: '武昌区',
                addressDetail: '黄鹤楼',
                isDefault: false,
                areaCode: '110101',
              },
        ],
        newOrderEnd:[],  //最终更新后的订单商品
        describe:"生活就像海洋"

    },
    mutations,
    actions:{

    }
})