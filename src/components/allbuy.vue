<template>
  <div class="allbuy">
    <div class="head"><p>我的订单</p></div>
    <div v-if="$store.state.admin.check" class="allbuy-content">
        <tab :line-width="1" :custom-bar-width="getBarWidth" active-color="#f5ad25">
          <tab-item selected >全部订单</tab-item>
          <tab-item on-item-click="click1">待评价</tab-item>
          <tab-item>退款</tab-item>
        </tab>
      <div v-if="$store.state.admin.finshorder[0]">
        <ul v-for="(aa,i) in $store.state.admin.finshorder" class="finsh-order">
          <h3 >{{aa[0]}} ><span>已完成订单</span></h3>
          <li class="order_list" v-for="(list,id) in $store.state.admin.finshorder[i]" v-if="id>0">
            <h4>{{list.title}}</h4>
            <span> x{{list.num}}</span>
          </li>
          <p>实付<span>￥{{allmoney[i]}}</span></p>
        </ul>
      </div>
      <div v-else>快去点单吧！！！！！！！</div>

    </div>
    <div v-else class="nologin">
      <div class="img"><img src="../assets/admin/admin.png" width="150px;"></div>
      <h4>您还没有登录，请登录后查看订单</h4>
      <router-link to="/login"><button>登录/注册</button></router-link>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux'

  export default{
    components: {
      Tab,
      TabItem
    },
    data(){
      return{
        allmoney:[],
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        }
      }
    },
    methods:{
      cilck1(){
        alert(1)
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
    },
    mounted(){
      this.$store.state.footData.home = require('../assets/footer/home.png')
      this.$store.state.footData.order = require('../assets/footer/order1.png')
      this.$store.state.footData.me = require('../assets/footer/me.png')
      var oList = document.getElementById("end").getElementsByTagName('li');
      for(let j=0;j<oList.length;j++){
        oList[j].className=""
      }
      oList[1].className="active"
      for(let i=0;i<this.$store.state.admin.finshorder.length;i++){
        for(let j=0;j<this.$store.state.shopData.shop.length;j++){
          if(this.$store.state.admin.finshorder[i][0]==this.$store.state.shopData.shop[j].name){
            this.allmoney.push(this.$store.state.shopData.shop[j].money+this.$store.state.shopData.shop[j].place[1])
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
