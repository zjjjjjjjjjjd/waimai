<template>
<div class="shoppage" id="shoppage">
  <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true" class="head">{{$store.state.shopData.shop[index].name}}</x-header>
  <div class="top-box">
  <div class="top">
    <div class="shop_top">
      <img :src="$store.state.shopData.shop[index].logo">
      <h4>{{$store.state.shopData.shop[index].name}}</h4>
    </div>
    <div class="like"><hr><span>收藏</span></div>
  </div>
  <hr>
  <div class="activity"><img src="../assets/pageshop/icon1.png"><span>满20减10;满30减13;满40减15;满50减20;</span><span>2个活动></span></div>
  </div>
  <tab :line-width="1" :custom-bar-width="getBarWidth" active-color="#f5ad25" class="tab" id="tab" >
    <tab-item selected @on-item-click="ck1">点菜</tab-item>
    <tab-item @on-item-click="ck2">评价</tab-item>
    <tab-item @on-item-click="ck3">详情</tab-item>
  </tab>
<router-view></router-view>
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
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    Tab,
    TabItem,
  },
  data(){
    return{
      num:0,
      cart:[require("../assets/pageshop/cart.png"),require("../assets/pageshop/cart2.png")],
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      index:this.$route.params.id,
      getBarWidth: function (index) {
        return (index + 1) * 22 + 'px'
      },
      showMenus: false,
      scroll:0
    }
  },
  methods:{
    ck1(){
        this.$router.push("/shopPage/0")
    },
    ck2(){
      this.$router.push("/shopPage/0/PingJia")
    },
    ck3(){
      this.$router.push("/shopPage/0/XiangQing")
    },
    tab(){
     var oTab = document.getElementById("tab");
     var oMenu = document.getElementById("menu-list");
     var oMenuList = document.getElementById("menu-list").getElementsByTagName("li");
     var oFood = document.getElementById("food-list").getElementsByTagName("ul");
      window.onscroll = function(){//监听窗口滚动事件
       if(document.body.scrollTop>=126){//大于126px固定tab栏和侧边菜单栏

         oTab.style.position="fixed";
         oMenu.style.position="fixed";
         oTab.style.top = "46px"
         oMenu.style.top = "90px"
         for(let i=0;i<oMenuList.length;i++){//在监听事件下顺便监听商品列表主题的对应菜单选择
           var num=0;//每次循环重置num
           for(let j=0;j<i;j++){
             num+=oFood[j].offsetHeight;//通过累加商品主题块的高度获取商品主题标题的位置
           }
           if(document.body.scrollTop>=(126+num)){//判断是否在该区域内
             for(let m=0;m<oMenuList.length;m++){
               oMenuList[m].className=""
             }
             oMenuList[i].className="active"//循环遍历全部侧边菜单栏，只对对应的菜单栏标签高亮
           }
         }
       }else{
         oTab.style.position="absolute"
         oMenu.style.position="absolute"
         oTab.style.top = "170px"
         oMenu.style.top = ""
       }
     }
    }
  },
  mounted(){
    this.tab();
  }
}
</script>
<style>

</style>
