<template>
    <div class="orders">
      <Headers title="订单"/>
      <div class="content">
        <van-tabs color="brown">
          <van-tab v-for="(item,index) in navData" :key="index" :title="item">

            <div v-if="(item==='全部' && store.state.newOrderEnd.length)" v-for="(element,indexx) in store.state.newOrderEnd" :key="indexx">
              <van-card :num="element.total" :price="element.price" :title="element.title"
                :thumb="element.pic" />
            </div>

            <div v-else>
              <Empty />
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <Footer />
    </div>
    </template>
    
<script>
    import Footer from '@/components/Footer.vue'
    import Headers from '@/views/store/components/header.vue'
    import { reactive, toRefs } from '@vue/reactivity'
    import { useStore } from 'vuex'
    import Empty from '@/components/Empty.vue'
    export default{
      components:{
        Footer,
        Headers,
        Empty
      },
      setup(){
        const store = useStore();
        let data = reactive({
          navData:["全部","交易完成","待付款","待发货","已发货"]
        });
    
        return {
          ...toRefs(data),
          store
        }
      }
    }
    </script>
    
<style lang="less" scoped>
    .orders{
      display: flex;
      flex-flow: column wrap;
      height: 100%;
      .content{
      flex:1;
      overflow-y: auto;
      }
    }
    </style>
    