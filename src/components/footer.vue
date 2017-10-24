<template>
  <div class="footer">
    <ul class="end" id="end">
      <router-link to="/"><li class="active"><img :src='$store.state.footData.home'><p>首页</p></li></router-link>
      <router-link to="/Allbuy"><li><img :src="$store.state.footData.order"><p>订单</p></li></router-link>
      <router-link to="/me"><li><img :src="$store.state.footData.me"><p>我的</p></li></router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    data(){
      return{
      }
    },
    methods:{
      choose(){
        var oList = document.getElementById("end").getElementsByTagName('li');
        var _this=this;
        for(let i=0;i<oList.length;i++){
          oList[i].index=i;
          oList[i].onclick=function () {
            for(let j=0;j<oList.length;j++){
              oList[j].className=""
              _this.$store.state.footData.home=require('../assets/footer/home.png')
              _this.$store.state.footData.order=require('../assets/footer/order.png')
              _this.$store.state.footData.me=require('../assets/footer/me.png')
            }
            this.className="active"
            if(this.index==0){
              _this.$store.state.footData.home=require('../assets/footer/home1.png')
            }else if(this.index==1){
              _this.$store.state.footData.order=require('../assets/footer/order1.png')
            }else if(this.index==2){
              _this.$store.state.footData.me=require('../assets/footer/me1.png')
            }
          }
        }
      }
    },
    mounted(){
      this.choose()
    }
  }
</script>
