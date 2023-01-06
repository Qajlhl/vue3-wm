<template>
<div class="home">
  <div class="content">
    <div class="header">
      <div class="left">外卖</div>
      <div class="right">
        <van-icon name="location-o" />
        <span>定位</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="main">
      <div class="main-head">
        <div class="main-search">
          <input type="text" />
          <div class="search-text">搜索</div>
        </div>
        <div class="main-sort">
          <div class="big-sort">
            <div v-for="(item,index) in big_data" :key="index">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`#${item.icon}`"></use>
              </svg>
              {{ item.name }}
            </div>
          </div>
          <div class="small-sort">
            <div v-for="(item,index) in small_data" :key="index">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`#${item.icon}`"></use>
              </svg>
              {{ item.name }}
            </div>
          </div>

        </div> 
      </div>

      <div>
        <van-tabs v-model:active="active" class="vant-tabs">
          <van-tab v-for="(item,index) in centent_nav_list" :key="index" :title="item.tab">
            <navLsit :List="item.data"/>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
  <Footer />
</div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import { reactive,toRefs,ref, onMounted } from 'vue'
import navLsit from './components/navList.vue'
import { getHomeApi } from '@/api/api'
export default{
  name:'home',
  components:{
    Footer,
    navLsit
  },
  setup(){
    let data = reactive({
      big_data:[],
      small_data:[],
      centent_nav_list:[]
    });
    const active = ref(0);
    const init = ()=>{
      // axios.get("/home/getHomeData").then((res)=>{
      //   //console.log(res);
      //   const {code,homeData} = res.data;
      //   if(code === 200)
      //   {
      //     data.big_data = homeData.big_data;
      //     data.small_data = homeData.small_data;
      //     data.centent_nav_list = homeData.centent_nav_list;
      //   }
      // }).catch((error)=>{
      //   console.log(error);
      // })

      getHomeApi().then((res)=>{
        data.big_data = res.big_data;
        data.small_data = res.small_data;
        data.centent_nav_list = res.centent_nav_list;
      })
    };

    onMounted(()=>{
      init();
    })
    return {
      active,
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.home{
  display: flex;
  flex-flow: column wrap;
  height: 100%;
  .content{
  flex:1;
  overflow-y: auto;
  }
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: hwb(0 26% 32%);
  padding: 20px 20px 40px 20px;
  .left{
    font-size: 20px;
    font-weight: 600;
  }
  .right{
    font-size: 14px;
    span{
      margin:0 5px;
    }
  }
}
.main{
  margin-top:-30px;
  .main-head{
    background-image: linear-gradient(#fff,#f5f5f5);
    padding:10px 20px 0 20px;
    border-radius: 30px 30px 0 0;
    .main-search{
      position:relative;
      input{
        width: 100%;
        border:1px solid brown;
        border-radius: 20px;
        height:30px;
      }
      .search-text{
        position: absolute;
        top:1px;
        right:-6px;
        width:50px;
        height:32px;
        background: brown;
        border-radius: 16px;
        text-align: center;
        line-height:32px;
        font-size:14px
      }
    }
    .main-sort{
      padding:20px 0;
      .big-sort{
        display:flex;
        div{
          font-size: 14px;
          flex:1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icon{
            width: 50px;
            height:50px;
            margin-bottom: 5px;
          }
        }
      }
      .small-sort{
        font-size:14px;
        display:flex;
        flex-wrap: wrap;
        margin-top: 20px;
        div{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 20%;
          .icon{
            width: 30px;
            height:30px;
            margin: 10px;
          }
        }
      }
    }
  }
  .vant-tabs{
    padding: 0 20px 10px;
  }
}

/deep/ .vant-tabs{
  border-radius: 10px;
}
</style>
