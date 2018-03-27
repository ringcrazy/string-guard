<template>
  <div>
      <div class="cell-container">
          <mt-cell
        title="提取字符串"
        to="/show"
        is-link
        value="提取">
      </mt-cell>
      <mt-cell
        title="修改字符串"
        to="/modify"
        is-link
        value="修改">
      </mt-cell>
      <mt-cell
        title="条件设置"
        to="/settings"
        is-link
        value="设置">
      </mt-cell>
      </div>
      <div class="btn-container">
          <mt-button size="large" type="danger" @click="quit">退出</mt-button>
      </div>
  </div>
</template>
<script>
import {logout} from 'api/user'
import {Toast} from 'mint-ui'
/* eslint-disable */
export default {
    methods: {
        quit () {
            logout().then(res => {
              Toast(res.msg)
              this.$router.push('/')
            })
        }
    }
}
</script>
<style scoped>
.btn-container{
  margin-top:20%;
  padding-left:15%;
  padding-right:15%;
}

</style>
