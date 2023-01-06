<template>
    <div class="register">
    <Header title="注册" />
    <div class="img">外卖</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="brown"
        >
          注册
        </van-button>
        <van-button
          round
          block
          type="info"
          color="brown"
          class="register"
          @click="toLogin"
        >
          去登陆
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import Header from '@/views/store/components/header.vue'
import { Toast } from 'vant';
export default {
    components:{
        Header
    },
    setup(){
        const router = useRouter();
        const data = reactive({
            username:'',
            password:''
        })
        const onSubmit = (value)=>{
          let data = JSON.parse(localStorage.getItem("userInfo"));
          //console.log(data);
          if( data!=null && data.username === value.username )
          {
            Toast("该用户已经存在");
            return;
          }
          else
          {
            localStorage.setItem("userInfo",JSON.stringify(value));
            Toast("注册成功");
            router.push("/login");
          }
        };
        const toLogin = ()=>{
            router.push('/');
        };
        return {
            onSubmit,
            toLogin,
            ...toRefs(data),
        }
    }
}
</script>

<style lang="less" scoped>
.register {
  .img {
    width: 200px;
    height: 200px;
    background-color: brown;
    font-size: 80px;
    line-height: 200px;
    text-align: center;
    border-radius: 40px;
    margin: 20px auto;
  }
  .register {
    margin-top: 20px;
  }
}
</style>