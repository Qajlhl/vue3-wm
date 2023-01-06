<template>
 <div class="footer">
    <div class="item">
        <router-link to="/" class="foot" active-class="actives">
        <van-icon name="wap-home-o" size="30"/>
        首页</router-link>
    </div >
    <div class="item">
        <router-link to="/car" class="foot" active-class="actives">
        <van-icon name="cart-o" size="30"/>
        购物车</router-link>
    </div>
    <div class="item">
        <router-link to="/mine" class="foot" active-class="actives">
        <van-icon name="user-o" size="30"/>
        我的</router-link>
    </div>
    <div class="item">
        <router-link to="/orders" class="foot" active-class="actives">
        <van-icon name="notes-o" size="30"/>
        订单</router-link>
    </div>
 </div>
</template>

<style lang="less" scoped>
.footer {
  display: flex;
  background: #fff;
  border-top: 0.5px solid #eee;
  font-size: 12px;
  .item {
    flex: 1;
    align-self: center;
    .actives {
      color: brown;
    }
    .foot{
      display: flex;
      flex-flow: column;
      align-items: center;
    }
  }
}
</style>