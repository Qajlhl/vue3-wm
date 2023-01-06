<template>
    <div class="create-order">
        <Header title="生成订单" />

        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />

        <div class="content">
            <div v-for="(item,index) in store.state.newOrder" :key="index">
            <van-card :num="item.total" :price="item.price" :title="item.title"
                :thumb="item.pic" />
        </div>
        </div>
        <div class="pay-wrap">
            <div>
                <span>商品金额</span>
                <span>￥{{ price }}</span>
            </div>
            <van-button type="primary" color="brown" class="pay-btn" block @click="onCreateOrder">生成订单</van-button>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { useStore } from 'vuex';
import Header from '@/views/store/components/header.vue'
import { onMounted } from '@vue/runtime-core';
import { Dialog } from 'vant';
import { useRoute, useRouter } from 'vue-router';
export default{
    components:{
        Header
    },
    setup(){
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        let data = reactive({
            tel:'1234567890',
            name:'张三',
            price:0
        });
        const onEdit = ()=>{
            router.push("/address");
        };
        const calPrice = ()=>{
            if(store.state.newOrder.length)
            {
                store.state.newOrder.forEach(element => {
                    data.price +=  element.price * element.total;     
                });
            }
        };

        const initUser = ()=>{
            store.state.userList.forEach((item) => {
                if(item.isDefault)
                {
                    data.name = item.name;
                    data.num = item.id;
                }
            })
        };

        onMounted(()=>{
            calPrice();
            initUser();
        });
        const onCreateOrder = ()=>{
            if(store.state.newOrder.length==0)
            {
                Dialog({
                    message:"商品列表为空!",
                    title:"提示"
                }).then(()=>{
                    router.push('/car');
                })
            }
            else
            {
                Dialog({
                    message:"成功生成订单",
                    title:"提示"
                }).then(()=>{
                    const newList = store.state.cartList.filter((item)=>{
                        return !route.query.list.includes(item.id+'');
                    });
                    //购物车列表更新
                    store.commit("DeleteGoods",newList);
                    store.commit("FinalOrder");
                    //跳转
                    router.push('/orders');
                })
            }
        };
        return {
            store,
            ...toRefs(data),
            onEdit,
            onCreateOrder
        }
    }
}
</script>
<style lang="less" scoped>
  .create-order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
  .pay-wrap {
    padding: 10px 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      width: 90%;
      margin: 0 auto;
      color: brown;
    }
  }
}
</style>