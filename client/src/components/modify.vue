<template>
    <div>
  <mt-header title="修改字符串">
        <router-link to="/index" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <mt-field label="新字符串" placeholder="请输入新字符串" v-model="stringValue"></mt-field>
    <mt-field label="重复字符串" placeholder="请再次输入新字符串" v-model="repeatString"></mt-field>
    <div class="btn-container">
      <mt-button type="primary" size="large" class="login-btn" @click="confirm">确定</mt-button>
    </div>
    </div>
</template>
<script>
/* eslint-disable */
import {update} from 'api/article'
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            stringValue: '',
            repeatString: ''
        }
    },
    methods: {
        confirm(){
            if(!this.stringValue.trim()){
                Toast('新字符串不能为空')
                return
            }
            if(this.stringValue !== this.repeatString){
                Toast('两次输入必须一致')
                return
            }
            update({
                content: this.stringValue
            }).then(res => {
                Toast(res.msg)
            })

        }
    }
}
</script>
<style scoped>
.btn-container{
    margin-top: 50%;
    padding-left:15%;
    padding-right:15%;
}
</style>
