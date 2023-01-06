<template>
    <div class="content-item">
        <div class="left">
            <van-checkbox :name="items.id" v-if="isChecked"/>
            <img :src="items.pic"/>
            <div class="text">
                <div class="title">
                    {{ items.title }}
                </div>
                <van-icon name="add-o" v-if="items.add" @click="handdleAdd(items.id)"/>
                <van-stepper v-else v-model="items.total" @change="handdleChange" :name="items.id"/>
            </div>
        </div>
        <div class="price"> ${{ items.price }}</div>
    </div>
</template>

<script>
export default{
    props:["items","handdleAdd","handdleChange","isChecked","flag"],
}
</script>

<style lang="less" scoped>
 .content-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .price {
      font-size: 16px;
      font-weight: 600;
      color:brown;
    }
    .left {
      display: flex;
      align-items: center;
      flex: 1;
      img {
        margin-left: 10px;
        width: 60px;
        height: 60px;
        margin-right: 10px;
        border-radius: 10px;
      }
      .text {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: 100%;
        position: relative;
        flex: 1;
        .title {
          color:black;
          font-size: 16px;
        }
        .van-icon {
          color: red;
          font-size: 20px;
          position: absolute;
          right: 4px;
          bottom: 4px;
        }
      }
    }
  }

</style>