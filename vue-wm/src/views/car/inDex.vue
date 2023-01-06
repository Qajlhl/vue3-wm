<template>
    <div class="car">
      <Header title="购物车" edit="true"/>
      <Detail v-if="isShow" :editShow="editShow"/>
      <Empty v-else/>
      <Footer />
    </div>
    </template>
    
    <script>
    import Footer from '@/components/Footer.vue'
    import Header from '@/views/store/components/header.vue'
    import Empty from '@/components/Empty.vue'
    import Detail from './component/detail.vue'
    import { useStore } from 'vuex'
    import { onMounted, ref } from 'vue'
    import ListItem from '@/components/ListItem.vue'
    export default{
      name:'car',
      components:{
        Footer,
        Header,
        Empty,
        Detail,
        ListItem
      },
      setup(){
        let isShow = ref(false);
        const store = useStore();
        const init = ()=>{
          if(store.state.cartList.length != 0)
          {
            isShow.value = true;
          }
        };
        const editShow = ()=>{
          isShow.value = false;
        }
        onMounted(()=>{
          init();
        })
        return{
          isShow,
          editShow
        }
      }
    }
    </script>
    
    <style lang="less" scoped>
    .car{
      display: flex;
      flex-flow: column wrap;
      height: 100%;
      .content{
      flex:1;
      overflow-y: auto;
      }
    }
    </style>
    