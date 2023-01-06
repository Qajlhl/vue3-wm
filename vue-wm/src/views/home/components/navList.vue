<template>
    <div>
        <div v-for="(item,index) in List" :key="index">
            <navItems :items="item" />
        </div>
    </div>
</template>

<script>
  import navItems from './navListItem.vue'
  export default{
    props:['List'],
    components:{
        navItems
    }
  }
</script>