<template>
    <div>
        <Header title="地址"/>
        <van-address-list 
           :list="addressList" 
           default-tag-text="默认" 
           @add="onAdd" 
           @edit="onEdit" />
    </div>
</template>

<script>
import Header from '@/views/store/components/header.vue'
import { useStore } from 'vuex'
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
export default{
    components:{
        Header,
    },
    setup(){
        const store = useStore();
        const router = useRouter();
        let data = reactive({
            addressList:[]
        });
        
        const init = ()=>{
            data.addressList = store.state.userList.map((item)=>{
                return{
                    id:item.id,
                    tel:item.tel,
                    isDefault:item.isDefault,
                    name:item.name,
                    address:`${item.province}${item.city}${item.county}${item.addressDetail}`
                }
            })
        };

        onMounted(()=>{
            init();
        });

        const onAdd = ()=>{
            router.push({
                path:"/addressEdit",
                query:{
                    type:"新增"
                }
            })
        };

        const onEdit = (item)=>{
            //返回一个对象
            // let data = data.addressList.filter((item)=>{
            // })
            let data = item.id
            //console.log("data=",data);
            router.push({
                path:"/addressEdit",
                query:{
                    data,
                    type:"编辑"
                }
            });
        };
        return{
            store,
            ...toRefs(data),
            onAdd,
            onEdit
        }
    }
}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
/deep/ .van-radio__icon {
  display: none;
}

</style>