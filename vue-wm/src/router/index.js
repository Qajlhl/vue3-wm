import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import home from '@/views/home/inDex.vue'
import mine from '@/views/mine/inDex.vue'
import orders from '@/views/orders/inDex.vue'
import car from '@/views/car/inDex.vue'
import store from '@/views/store/index.vue'
import createOrder from '@/views/createOder/index.vue'
import address from '@/views/address/index.vue'
import addressEdit from '@/views/addressEdit/index.vue'
import userinfoedit from '@/views/userinfoedit/index.vue'
import login from '@/views/login/index.vue'
import register from '@/views/register/index.vue'
import { Toast } from 'vant'

const routes = [
    {
        path:'/', 
        name:'home',
        component:home
    },
    {
        path:'/mine',
        name:'mine',
        component:mine,
        meta:{
            isAuth:true
        }
    },
    {
        path:'/car',
        name:'car',
        component:car,
        meta:{
            isAuth:true
        }
    },
    {
        path:'/orders',
        name:'orders',
        component:orders,
        meta:{
            isAuth:true
        }
    },
    {
        path:'/store',
        name:'store',
        component:store
    },
    {
        path:'/createOrder',
        name:'createOrder',
        component:createOrder
    },
    {
        path:'/address',
        name:'address',
        component:address
    },
    {
        path:'/addressEdit',
        name:'addressEdit',
        component:addressEdit
    },
    {
        path:'/userinfoedit',
        name:'userinfoedit',
        component:userinfoedit
    },
    {
        path:'/register',
        name:'register',
        component:register
    },
    {
        path:'/login',
        name:'login',
        component:login
    }
]

const router = createRouter({
    routes,
    history:createWebHistory(),
    linkActiveClass: 'active'
});

//前置守卫
router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth)
    {
        if (localStorage.getItem('isLogin') == 'login') {
            next();
        } else {
            Toast("请先登录");
            next({
                path:'/login',
                query:{
                    toPath:to.path
                }
            });
        }
    }
    else
    {
        next();
    }
})

export default router;