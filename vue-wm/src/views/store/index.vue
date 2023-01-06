<template>
    <div class="store">
        <Header title="店铺" :edit="false"/>
        <div class="content">
            <div class="img"></div>
            <div class="foodSort">
                <div class="sort"></div>
                <div class="name">
                    {{ title }}
                    <img :src="img" alt="" class="store-img">
                </div>
                <van-tabs v-model:active="active" class="store-tabs">
                    <van-tab v-for="(item,index) in storeData" :key="index" :title="item.name">
                        <foodList :foodData="item.data" :index="index"/> 
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" dot />
        <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.state.cartList.length" @click="toCart"/>
        <van-action-bar-button type="warning" text="加入购物车" @click="handdleGoods"/>
        <van-action-bar-button type="danger" text="立即购买" @click="toBuy"/>
    </van-action-bar>

    </div>
</template>

<script>
  import { toRefs,reactive,ref, onMounted } from 'vue';
  import Header from './components/header.vue';
  import foodList from '@/views/store/components/foodList.vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { Toast } from 'vant';
  import { getStoreApi } from '@/api/api'
  //import ListItem from '@/components/FoodList.vue'
  export default{
    components:{
        Header,
        foodList
    },
    setup(){
        const store = useStore();
        const active = ref(0);
        const router = useRouter();
        let data = reactive({
            title:"超级酸菜鱼",
            img:'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
            storeData:[]
        });
        
        const handdleGoods = (type)=>{ //加入购物车
            let arr = [];
            data.storeData.forEach(element => {
                element.data.items?.forEach((item)=>{
                    item.children.forEach((it)=>{
                        if(it.num > 0)
                        {
                            it.total =  it.num + it.total;
                            arr.push(it);
                            it.add = true;
                            it.num = 0;
                        }
                    })
                })
            });
            if(arr.length === 0)
            {
                Toast("请选择需要购买的商品");
                return;
            }
            store.commit('ADDGOODS',arr);
            type==="buy"? toCart():'';
        };
        
        const toCart = ()=>{
            router.push('/car');
        };

        const toBuy = ()=>{
            handdleGoods("buy");
        };
        
        const init = ()=>{
            // axios.get('/store/getStoreData').then((res)=>{
            //     let {code,storeData} = res.data;
            //     if(code === 200)
            //     {
            //         data.storeData = storeData;
            //     }
            // }).catch(error => console.log(error))

            getStoreApi().then((res)=>{
                data.storeData = res;
            })
        };

        onMounted(()=>{
            init();
        });

        return{
            ...toRefs(data),
            active,
            store,
            handdleGoods,
            toCart,
            toBuy
        }
    },
  }
</script>

<style lang="less" scoped>
.store {
    height: 100%;
    display: flex;
    flex-flow: column;
    .content {
      flex: 1;
      overflow-y: auto;
      .img {
        background: url("../../assets/yuna.jpg") no-repeat center/cover;
        width: 100%;
        height: 150px;
      }
      .foodSort {
        height: 500px;
        background-color: #fff;
        margin-top: -30px;
        border-radius: 20px 20px 0 0;

        .sort {
          margin-top: 10px;
        }
        .name {
          display: flex;
          padding: 20px;
          justify-content: space-between;
          .store-img {
            width: 80px;
            height: 80px;
            border-radius: 10px;
            margin-top: -30px;
          }
        }
      }
    }
  }
</style>