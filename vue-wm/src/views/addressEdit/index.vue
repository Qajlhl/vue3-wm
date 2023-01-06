<template>
    <div>
        <Header :title="route.query.type==='新增'?'新增地址':'编辑地址' "/>
        <div class="content">
            <van-address-edit 
                :area-list="areaList" 
                show-delete 
                show-set-default 
                show-search-result
                :address-info="addressInfo"
                :area-columns-placeholder="['请选择', '请选择', '请选择']" 
                @save="onSave" 
                @delete="onDelete"
                @change-detail="onChangeDetail" />
        </div>
    </div>
</template>

<script>
import Header from '@/views/store/components/header.vue'
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
import router from '@/router'
export default {
    components:{
        Header
    },
    setup(){
        const store = useStore();
        const route = useRoute();
        const data = reactive({
            areaList:{
            province_list: {
              110000: "广东省",
              120000: "浙江省",
            },
            city_list: {
              110100: "广州市",
              110200: "深圳市",
              120100: "杭州市",
              120200: "宁波市",
            },
            county_list: {
              110101: "天河区",
              110102: "海珠区",
              110201:"宝安区",
              110202:"福田区",
              110203:"龙岗区",
              110204:"盐田区",
              120101:"老城区",
              120102: "上城区",
              120103: "下城区",
              120201:"江北区",
              120202:"镇海区",
              120203:"奉化区",
            }
            },
            addressInfo:{}, 
        });

        const init = ()=>{
            store.state.userList.forEach(element => {
                //element.id是Number类型  route.query.data是string类型
                if( element.id == route.query.data)
                {
                    data.addressInfo = element;
                    return;
                }
            });
        };

        onMounted(()=>{
            init();
        });

        const onChangeDetail = ()=>{};

        const onSave = (content)=>{
            //新增和编辑
            if(route.query.type === "新增")
            {
                store.commit("addAddress",content);
            }
            else
            {
                store.commit("editAddress",content);
            }
            Toast("操作成功");
            setTimeout(() => {
                router.back();
            }, 800);
        };

        const onDelete = (content)=>{
            store.commit("deleteAddress",content);
            Toast("操作成功");
            setTimeout(() => {
                router.back();
            }, 800);
        };

        return{
            ...toRefs(data),
            onChangeDetail,
            onSave,
            onDelete,
            store,
            route
        }
    }
}
</script>