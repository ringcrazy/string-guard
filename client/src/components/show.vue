<template>
    <div>
  <mt-header title="提取字符串">
        <router-link to="/index" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <mt-field label="字符串" placeholder="" v-model="protectedString"></mt-field>
    </div>
</template>
<script>
/* eslint-disable */
import {get, update} from 'api/article'
export default {
    data() {
        return {
            protectedString: ''
        }
    },
    mounted() {
        get().then(res => {
            this.protectedString = res.data.content
        })
    }
}
</script>
<style scoped>
</style>
