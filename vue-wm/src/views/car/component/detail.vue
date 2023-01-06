<template>
    <div class="cartDetail">
      <div class="content">
        <van-checkbox-group v-model="checked" @change="ItemChange">
          <div v-for="(item,index) in store.state.cartList" :key="index">
            <ListItem :items="item" :handdleAdd="handdleAdd" :isChecked="true" :handdleChange="handdleChange" :flag="item.total"/>
          </div>
        </van-checkbox-group>
      </div>

      <van-submit-bar :price="prices" button-text="提交订单" @submit="onSubmit" class="submit-all " button-color="brown" v-if="!store.state.isEdit">
        <van-checkbox v-model="submitChecked" checked-color="brown" @click="clickAll">全选</van-checkbox>
      </van-submit-bar>

      <div class="buy" v-else>
        <div class="left">
          <van-checkbox v-model="submitChecked" checked-color="brown" @click="clickAll">全选</van-checkbox>
        </div>
        <div class="delete" @click="onDelete">删除</div>
      </div>
    </div>
</template>

<script>
import { reactive, toRefs,computed } from "vue"
import { useStore } from "vuex"
import ListItem from "@/components/ListItem.vue";
import { onMounted } from "@vue/runtime-core";
import { Toast } from "vant";
import { useRouter } from "vue-router";
  export default({
    props:['editShow'],
    components:{
      ListItem
    },
    setup(props){
      const store = useStore();
      const router = useRouter();
      let data = reactive({
        checked :[],
        submitChecked:true
      })
      const handdleAdd = ()=>{}
      const handdleChange = (value,detail)=>{
        store.state.cartList.forEach((item)=>{
          if(item.id === detail.name)
          {
            item.num = value;
          }
        })
      }
      const Init = ()=>{
        store.state.cartList.forEach((item)=>{
          item.add = false;
        })
        data.checked = store.state.cartList.map(item => item.id);
      }
      onMounted(()=>{
        Init();
      });
      
      const onSubmit = ()=>{
        //结算  生成订单
        if(data.checked.length === 0)
        {
          Toast("请选择需要结算的商品");
        }
        else
        {
          let countList = store.state.cartList.filter((item) => {
            //返回被选中的商品
            return data.checked.includes(item.id);
          });
          store.commit("orders",countList);
          router.push({
            path:"/createOrder",
            query:{
              list:data.checked
            }
          });
        }
      };

      const clickAll = ()=>{
        if(data.checked.length !== store.state.cartList.length)
        {
          Init();
        }
        else
        {
          data.checked = [];
        }
      };

      const ItemChange = (result)=>{
        if(result.length === store.state.cartList.length)
        {
          data.submitChecked = true;
        }
        else
        {
          data.submitChecked = false;
        }

        data.checked = result;
      };

      const prices = computed(()=>{
        let countList = store.state.cartList.filter((item) => {
          return data.checked.includes(item.id);
        });
        let sum = 0;
        countList.forEach((item) => {
          sum += item.total * item.price;
        })
        return sum*100;
      });

      const onDelete = ()=>{
        //判断选中的商品是否为空
        if(data.checked.length)
        {
          let countList = store.state.cartList.filter((item) => {
            // 如果是删除全部商品 则返回选中的所有商品 否则返回未被选中的商品
            return data.checked.length === store.state.cartList.length? data.checked.includes(item.id) : !data.checked.includes(item.id);
          });
          //如果是删除全部商品
          if(countList.length === store.state.cartList.length)
          {
            props.editShow();
            //完成->编辑
            store.commit("edit");
          }
          store.commit("DeleteGoods",countList);
        }
        else
        {
          Toast("请选择您需要删除的商品");
        }
      };

      return {
        ...toRefs(data),
        store,
        handdleAdd,
        handdleChange,
        onSubmit,
        clickAll,
        ItemChange,
        prices,
        onDelete
      }
    }
  })
</script>
<style lang="less" scoped>
.cartDetail {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 20px 55px;
  .submit-all {
    position: fixed;
    bottom: 58px;
  }

  .buy {
    position: fixed;
    bottom: 58px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    height: 50px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
    }
    .delete {
      color: #fff;
      background-color: brown;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }

  .content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>