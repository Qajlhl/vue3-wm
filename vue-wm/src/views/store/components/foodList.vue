<template>
    <div v-if="index === 0" class=".food-list">
        <van-tree-select 
        v-model:main-active-index="activeIndex" 
        height="88vw" 
        :items="items" 
        class="van-tree-select__item--active"
        @click-nav="onclick">
            <template #content>
                <div v-for="(item,index) in subItem" :key="index" class="item-bg">
                    <!-- 商铺 -->
                    <FoodItem :items="item" :handdleAdd="handdleAdd" :handdleChange="handdleChange" :flag="item.num"/>
                </div>
            </template>
        </van-tree-select>
    </div>

    <div v-else>
        {{ foodData.content }}
    </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity"
import ListItem from '@/components/ListItem.vue'
import FoodItem from "./foodItem.vue";
import { onMounted } from "@vue/runtime-core";
//import { useRoute } from "vue-router";
export default({
    components:{
    ListItem,
    FoodItem
    },
    props:['index','foodData'],
    setup(props){
        //const route = useRoute();
        let data = reactive({
           items: [{ text: '分组 1' }, { text: '分组 2' }],
           activeIndex:0,
           subItem:[],
        });
        const Init = ()=>{
            let arr = [];
            props.foodData?.items?.forEach((item,index) => {
                arr.push({
                    text:item.text
                })
                if(index === data.activeIndex)
                {
                    data.subItem = item.children;
                }
            });
            data.items = arr;
        };
        onMounted(()=>{
            Init();
        })
        const onclick = (i)=>{
            data.activeIndex = i;
            Init();
        };
        const handdleAdd = (id)=>{
            data.subItem.forEach((item) => {
                if (item.id === id) {
                    item.add = false;
                    item.num = 1;
                }
            })
        };

        const handdleChange = (value,detail)=>{
            data.subItem.forEach((item) => {
                if (item.id === detail.name) {
                    item.num = value;
                }
            })
        };
        
        return{
            ...toRefs(data),
            onclick,
            handdleAdd,
            handdleChange
        }
    },
})

</script>

<style lang="less" scoped>
.food-list {
margin-top: 20px;
.item-bg {
  padding: 10px;
}
}
/deep/ .van-tree-select__item--active {
  color: #ffc400;
}
/deep/ .van-sidebar-item--select::before {
  background-color: #ffc400;
}
</style>

