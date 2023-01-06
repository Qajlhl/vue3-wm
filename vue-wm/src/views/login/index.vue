<template>
    <div class="login">
    <Header title="登录" />
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
          登录
        </van-button>
        <van-button
          round
          block
          type="info"
          color="brown"
          class="register"
          @click="toRegister"
        >
          去注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router';
import Header from '@/views/store/components/header.vue'
import { Toast } from 'vant';
import { onMounted } from '@vue/runtime-core';
export default {
    components:{
        Header
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const data = reactive({
            username: '',
            password:''
        });

        const toRegister = ()=>{
            router.push('/register');
        };

        const onSubmit = (value)=>{
          let data = JSON.parse(localStorage.getItem("userInfo"));
          //1、该用户是否已经存在
          if(data === null)
          {
            Toast("该用户不存在");
            return;
          }
          else
          {
            //2、该用户是否已经登录过了
            if(localStorage.getItem("isLogin") == "login")
            {
              Toast("登录成功");
              if(!route.query.toPath)
              {
                router.push("/");
              }
              else
              {
                router.push(route.query.toPath);
              }
              return;
            }
            else
            {
              //3、未登录   用户输入的密码是否正确
              if(data.password === value.password)
              {
                Toast("登录成功");
                if (!route.query.toPath) {
                  router.push("/");
                }
                else {
                  router.push(route.query.toPath);
                }
              }
              else
              {
                Toast("密码错误");
                return;
              }
            }
          }

          //3、登录成功后更新localStorage
          localStorage.setItem("isLogin","login");
        };

        const init = ()=>{
          let value = JSON.parse(localStorage.getItem("userInfo"));
          if(value != null)
          {
            data.username = value.username;
            data.password = value.password;
          }
        };

        onMounted(()=>{
          init();
        })
        return {
            ...toRefs(data),
            toRegister,
            onSubmit
        }
    }
}
</script>

<style lang="less" scoped>
.login {
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