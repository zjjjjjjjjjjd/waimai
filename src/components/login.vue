<template>
  <div>
    <x-header>登录<a slot="right"><router-link to="/register">注册</router-link></a></x-header>
    <div class="login">
      <h4>欢迎登录</h4>
      <group>
        <x-input title="用户名" name="username" placeholder="请输入姓名" is-type="name" v-model="name"></x-input>
        <x-input title="密码" name="passward" placeholder="请输入密码" is-type="passward" v-model="paw"></x-input>
      </group>
      <button @click="login" class="lg">登录</button>
    </div>
  </div>
</template>
<script>
  import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
  import { XInput, Group, XButton, Cell } from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
      XInput,
      XButton,
      Group,
      Cell
    },
    data(){

      return{
        name:'',
        paw:''
      }},
    methods:{
      login(){
        if(this.$store.state.admin.people[this.name] == this.paw){
          alert('登陆成功，欢迎来到个人中心')
          this.$store.state.admin.paw=this.paw
          this.$store.state.admin.name=this.name
          this.$router.push('/me')
          this.$store.state.admin.check=true

        }else{
          alert('请输入正确信息！')
          this.name = ''
          this.paw = ''
        }

      }
    },
    mounted(){

    }

  }
</script>
<style>
</style>
