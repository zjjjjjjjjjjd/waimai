<template>
  <div>
    <x-header>注册</x-header>
    <div class="login">
      <h4>欢迎注册</h4>
      <group>
        <x-input title="用户名" name="username" placeholder="请输入用户名" is-type="name" v-model="name"></x-input>
        <x-input title="密码" name="passward" placeholder="请输入密码" is-type="passward" v-model="paw"></x-input>
        <x-input title="手机号" name="passward" placeholder="请输入手机号" is-type="passward" v-model="tel"></x-input>
      </group>
      <button @click="reg" class="lg">注册</button>
      <router-link to="/login">已有账号，去登录</router-link>
      {{$store.state.admin.paw}}
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
        tel:'',
        name:'',
        paw:''
      }},
    methods:{
      reg(){
        if(this.tel && this.name&&this.paw){
          this.$store.state.admin.people[this.name] =this.paw;
          this.$store.state.admin.tel=this.tel;
          alert('注册成功！即将返回登陆页面')
          this.$router.push('/login')
        }else{
          alert('请输入正确信息！')
        }

      }
    }

  }
</script>
