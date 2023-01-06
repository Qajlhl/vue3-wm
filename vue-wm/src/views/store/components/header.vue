<template>
    <div class="header">
        <van-icon name="arrow-left" class="icon" @click="toBack()"/>
        <div>{{ title }}</div>
        <div class="edit" v-if="edit" @click="onEdit">
          <!-- isEdit为false的时候表示显示编辑 -->
          {{ store.state.isEdit? "完成" : "编辑" }}
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  export default{
    props:['title','edit'],
    setup(){
      const store = useStore();
      const router = useRouter();
      const toBack = ()=>{
        //当isEdit为false的时候表示计算总金额(默认应该为false)
        if(store.state.isEdit) { store.commit("edit"); }
        router.back();
      };
      const onEdit = ()=>{
        if(store.state.cartList.length)
        {
          store.commit("edit");
        }
        else
        {
          Toast("购物车不能为空");
        }
        
      };
      return {
        toBack,
        store,
        onEdit
      }
    }
  }
</script>

<style lang="less" scoped>
.header {
  background-color: #fff;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  .edit {
    font-size: 16px;
    position: absolute;
    right: 15px;
    font-weight: normal;
  }
  .icon {
    position: absolute;
    left: 10px;
  }
}
</style>