<template>
  <div class="admin">
  <x-header>个人信息</x-header>
    <div class="xinxi">
      <li id="c">
        收货人姓名：{{$store.state.admin.mz}}
        <button onclick="c.style.display='none',d.style.display='flex'">修改</button>
      </li>
      <li id="d">
        <input type="text" :placeholder="mz" v-model="mz"/><button onclick="c.style.display='flex',d.style.display='none'" @click='xm'>确定修改</button>
      </li>
      <li id="a">
        收货地址：{{$store.state.admin.dz}}
        <button onclick="a.style.display='none',b.style.display='flex'">修改</button>
      </li>
      <li id="b">
        <input type="text" :placeholder="address" v-model="address"/><button onclick="a.style.display='flex',b.style.display='none'" @click='gb'>确定修改</button>
      </li>
      <li id="e">
        手机:{{$store.state.admin.tel}}
        <button onclick="e.style.display='none',f.style.display='flex'">修改</button>
      </li>
      <li id="f" style="display: none;">
        <input type="text" :placeholder="telphone" v-model="telphone"/><button onclick="e.style.display='flex',f.style.display='none'" @click='tel'>确定修改</button>
      </li>
    </div>
    <router-link to="/me"><button @click="out" class="out">退出</button></router-link>
	</div>
  </div>
</template>

<script>
  import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
    },
    data(){
      return{
        mz:'',
        address:'',
        telphone:''
      }
    },
     mounted() {

     },
    methods:{
      gb(){
        this.$store.state.admin.dz=this.address
      },
      xm(){

        this.$store.state.admin.mz=this.mz
      },
      tel(){
        this.$store.state.admin.tel=this.telphone
      },
     out(){
      this.$store.state.admin.check=false
      }
    }
  }
</script>
<style>

</style>
