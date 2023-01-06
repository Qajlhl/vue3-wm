<template>
    <div>
        <Header title="账号管理"/>

        <div class="form">
            <van-cell-group inset>
                <van-field label="账号：" :model-value="username" readonly />
                <van-field label="旧密码：" :model-value="password" readonly/>
                <van-field label="新密码：" v-model="rePassword" placeholder="请输入新密码" required :error="isError"/>
                <van-field label="个性签名：" v-model="sign" :placeholder="sign===''? '请输入个性签名' : '' "/>
            </van-cell-group>
        </div>

        <van-button type="success" class="save-btn" color="brown" round block @click="onSave">保存</van-button>
        <van-button type="danger" class="save-btn" color="brown" round block @click="onDelete">退出</van-button>
    </div>
</template>

<script>
import Header from '@/views/store/components/header.vue'
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import { Toast } from 'vant';
import router from '@/router';
import { useStore } from 'vuex';
export default {
    components:{
        Header
    },
    setup(){
        const store = useStore();
        const data = reactive({
            username:'',
            password:'',
            sign:'',
            rePassword:'',
            isError:false
        });

        const init = ()=>{
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if(userInfo != null)
            {
                data.username = userInfo.username;
                data.password = userInfo.password;
            }
            data.sign = store.state.describe;
        };

        onMounted(()=>{
            init();
        });

        const onSave = ()=>{
            //保存修改
            // 未输入新密码
            if(data.rePassword === "")
            {
                data.isError = true;
                return;
            }
            else
            {
                //新旧密码一致
                if(data.rePassword === data.password)
                {
                    Toast.fail("新密码必须和旧密码不一致");
                    return;
                }
                else
                {
                    const res = {
                        username:data.username,
                        password:data.rePassword
                    };
                    localStorage.setItem("userInfo",JSON.stringify(res));
                    //个性签名
                    console.log(data.sign,store.state.describe)
                    if(!(store.state.describe === data.sign))
                    {
                        store.commit("editSign",data.sign);
                    }
                    router.push("/mine");
                    Toast.success("修改成功");
                }
            }
        };

        const onDelete = ()=>{
            //退出
            localStorage.removeItem("isLogin");
            router.push("/");
            Toast.success("退出成功");
        };
        return{
            ...toRefs(data),
            onDelete,
            onSave
        }
    }
}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
  background-color: brown;
  border-color: brown;
}
.save-btn {
  width: 80%;
  margin: 20px auto;
}

.form{
    margin-top: 10px;
}
</style>