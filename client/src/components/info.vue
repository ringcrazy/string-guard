<template>
    <div>
        <mt-header title="修改密码">
        <router-link to="/index" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <mt-field label="用户名" readonly=true v-model="username"></mt-field>
    <mt-field label="新密码" placeholder="输入新密码" type="password" v-model="password"></mt-field>
    <mt-field label="重复新密码" placeholder="再次输入新密码" type="confirmpassword" v-model="password"></mt-field>
    <div class="btn-container">
      <mt-button type="primary" size="large" class="login-btn">设定</mt-button>
      </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    data () {
        return {
            username: 'admin'
        }
    }
}
</script>
<style scoped>
.btn-container{
  margin-top:5%;
  padding-left:15%;
  padding-right:15%;
}
</style>
