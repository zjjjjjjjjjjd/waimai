<template>
  <div >
    <div class="admin_head">
      <img src="../assets/admin/touxiang.png" width="100px"><span v-if="$store.state.admin.check">
      <router-link to="/admin"><p>{{$store.state.admin.name}}</p><p>个人信息></p></router-link>
    </span>
      <span v-else><router-link to="/login">马上登陆</router-link></span>
    </div>

  </div>
</template>
<script>
  export default{
    mounted() {
      this.$store.state.footData.home = require('../assets/footer/home.png')
      this.$store.state.footData.order = require('../assets/footer/order.png')
      this.$store.state.footData.me = require('../assets/footer/me1.png')
      var oList = document.getElementById("end").getElementsByTagName('li');
      for(let j=0;j<oList.length;j++){
        oList[j].className=""
      }
      oList[2].className="active"
    }
  }
</script>
