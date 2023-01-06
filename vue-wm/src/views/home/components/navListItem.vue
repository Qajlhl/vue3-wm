<template>
    <div class="container" @click="toStore">
      <img :src="items.pic"/>
      <div class="content">
        <div class="title">{{ items.title }}</div>
        <div class="sales">{{ items.sales }}</div>
        <div class="price">{{ items.price }}</div>
        <div class="label">
            <div v-for="(item,index) in items.label" :key="index">
                {{ item }}
            </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { useRouter } from 'vue-router';
  export default{
    props:['items'],
    setup(){
        const router = useRouter();
        const toStore = ()=>{
            router.push('/store');
        }
        return {
            toStore,
        }
    }
  }
</script>

<style lang="less" scoped>
  .container{
    background: #fff;
    border-radius: 10px;
    display: flex;
    padding: 10px;
    img{
        width: 120px;
        height: 120px;
        border-radius: 10px;
        margin-right: 20px;
    }
    .content{
        display: flex;
        flex-direction: column;
        .title{
            font-size: 18px;
        }
        .label{
            display: flex;
            div{
                font-size:14px;
                background: brown;
                padding:2px 5px;
                border-radius: 5px;
                margin-right:5px;
            }
        }
    }
  }
</style>