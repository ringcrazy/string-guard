<template>
  <div>
      <mt-header title="条件设置">
        <router-link to="/index" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        </mt-header>
      <div class="field-content">
          <label>工作日-时间设定</label>
          <mt-cell title="起始时间" is-link @click.native="openPicker('workdayStartPicker')">
              <span>{{workdayStart}}</span>
          </mt-cell>
          <mt-cell title="结束时间" is-link @click.native="openPicker('workdayEndPicker')">
              <span>{{workdayEnd}}</span>
          </mt-cell>
          <mt-datetime-picker
            ref="workdayStartPicker"
            v-model="workdayStart"
            cancelText=''
            confirmText='完成'
            type="time">
          </mt-datetime-picker>
          <mt-datetime-picker
            ref="workdayEndPicker"
            v-model="workdayEnd"
            cancelText=''
            confirmText='完成'
            type="time">
          </mt-datetime-picker>
      </div>
      <div class="field-content">
          <label>周末-时间设定</label>
          <mt-cell title="起始时间" is-link @click.native="openPicker('weekendStartPicker')">
              <span>{{weekendStart}}</span>
          </mt-cell>
          <mt-cell title="结束时间" is-link @click.native="openPicker('weekendEndPicker')">
              <span>{{weekendEnd}}</span>
          </mt-cell>
          <mt-datetime-picker
            ref="weekendStartPicker"
            v-model="weekendStart"
            cancelText=''
            confirmText='完成'
            type="time">
          </mt-datetime-picker>
          <mt-datetime-picker
            ref="weekendEndPicker"
            v-model="weekendEnd"
            cancelText=''
            confirmText='完成'
            type="time">
          </mt-datetime-picker>
      </div>
      <div class="field-content">
          <label>每日登录次数限定（最高）</label>
          <mt-field label="限定值" placeholder="请输入次数" type="number" v-model="allowedCount"></mt-field>
      </div>
      <div class="btn-container">
      <mt-button type="primary" size="large" class="login-btn" @click.native="updateRule">设定</mt-button>
      </div>
  </div>
</template>
<script>
/* eslint-disable */
import {Toast} from 'mint-ui'
import {get, update} from 'api/rule'
export default {
  data () {
    return {
      timeShow: true,
      workdayStart: '00:00',
      workdayEnd: '00:00',
      weekendStart: '00:00',
      weekendEnd: '00:00',
      allowedCount: 0
    }
  },
  mounted(){
    get().then(res => {
      let {workday, weekend, allowedCount} = res.data
      this.workdayStart =`${this.decorate(workday.startHour)}:${this.decorate(workday.startMinute)}`
      this.workdayEnd =`${this.decorate(workday.endHour)}:${this.decorate(workday.endMinute)}`
      this.weekendStart =`${this.decorate(weekend.startHour)}:${this.decorate(weekend.startMinute)}`
      this.weekendEnd =`${this.decorate(weekend.endHour)}:${this.decorate(weekend.endMinute)}`
      this.allowedCount = allowedCount
    })
  },
  methods: {
    openPicker (pick) {
      this.$refs[pick].open()
    },
    decorate(val){
      if(val < 10){
        return '0'+ val
      }else{
        return val + ''
      }
    },
    tear(val){
      if(/^0/.test(val)){
        return val.substr(1) - 0
      }
      return val - 0
    },
    updateRule(){
      let [workdayStartHour, workdayStartMinute] = this.workdayStart.split(':') 
      let [workdayEndHour, workdayEndMinute] = this.workdayEnd.split(':') 
      let [weekendStartHour, weekendStartMinute] = this.weekendStart.split(':') 
      let [weekendEndHour, weekendEndMinute] = this.weekendEnd.split(':')

      if(!(0 < this.allowedCount < 10) ){
        Toast('请输入正确的限定值')
        return 
      }
      update({
        allowedCount: this.allowedCount,
        workday: {
          startHour: this.tear(workdayStartHour),
          startMinute: this.tear(workdayStartMinute),
          endHour: this.tear(workdayEndHour),
          endMinute: this.tear(workdayEndMinute)
        },
        weekend: {
          startHour: this.tear(weekendStartHour),
          startMinute: this.tear(weekendStartMinute),
          endHour: this.tear(weekendEndHour),
          endMinute: this.tear(weekendEndMinute)
        }
      }).then(res => {
        Toast(res.msg)
      })
    }
  }
}
</script>
<style scoped>
.field-content label{
    line-height: 40px;
    font-weight: bold;
    margin-left: 10px;
}
.btn-container{
  margin-top:5%;
  padding-left:15%;
  padding-right:15%;
}
</style>
