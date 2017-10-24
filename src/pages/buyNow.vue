<template>
	<div class="buynow">
    <x-header>提交订单</x-header>
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
    <div class="buy-list">
      <li v-for="(list,i) in $store.state.shopData.shop[index].food" v-if="list.num>0" class="order_list">
        <div class="food_img"><img :src="list.pic"><h4>{{list.title}}<p>x{{list.num}}</p></h4></div>
        <div class="btn">
          <span>￥{{list.num*list.pay}}</span>
        </div>
      </li>
      <div class="peisong"><div>配送费</div><span>￥{{$store.state.shopData.shop[index].place[1]}}</span></div>
    </div>
		<div class="all">
      <p>合计￥<span>{{this.$store.state.shopData.shop[index].money+$store.state.shopData.shop[index].place[1]}}</span></p>
      <button @click='zfb'>提交订单</button>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux'
  import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components: {
      Tab,
      TabItem,
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
    },
    data(){
      return{
      	allmoney:0,
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        },
        index:this.$route.params.id,
        mz:'',
        address:'',
        telphone:''
      }
    },
     mounted() {
     	var i=0
     	while(i<this.$store.state.admin.order.length){
     		 this.allmoney+=this.$store.state.admin.order[i].num*this.$store.state.admin.order[i].pay
     		 i++
     	}
    },
    methods:{
    	zfb(){
    	  if(this.$store.state.admin.dz&&this.$store.state.admin.mz){
          this.$store.state.admin.finshorder.push(JSON.parse(JSON.stringify(this.$store.state.admin.order[this.index])))
          alert('支付成功！')
          this.$router.push('/Allbuy')
        }else{
    	    alert("请填写完整个人信息！")
        }

    	},
      cilck1(){
    	  alert(1)
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      gb(){
        this.$store.state.admin.dz=this.address
      },
      xm(){

        this.$store.state.admin.mz=this.mz
      },
      tel(){
        this.$store.state.admin.tel=this.telphone
      }
    }
  }
</script>
<style lang="less" scoped>


</style>
