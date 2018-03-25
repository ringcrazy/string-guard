<template>
  <div class="login-wrapper">
    <mt-field label="用户名" placeholder="请输入用户名称" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <div class="btn-container">
      <mt-button type="primary" size="large" class="login-btn" @click="login">登录</mt-button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import {login, logout} from 'api/user'
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if(!this.username || !this.password){
        Toast('请完善用户信息！')
        return
      }
      login({
        username: this.username,
        password: this.password
      }).then(res =>{
        if(res.code === 0){
          this.$router.replace('/index')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-container{
  margin-top:50%;
  padding-left:15%;
  padding-right:15%;
}
</style>
