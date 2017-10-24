<template>
  <div class="home">
    <div class="head"><p>外卖APP</p></div>
    <div id="search">
      <search
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="value"
        position="absolute"
        auto-scroll-to-top top="50px"
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search"
        placeholder="请输入商家或者商品名称"
      >
      </search>

    </div>
    <div class="nav" id="nav">
      <li v-for="i in nav1"><img :src="i.img"><p>{{i.name}}</p></li>
    </div>
    <swiper auto height="100px">
      <swiper-item class="black"><img src="../assets/home/banner.png" width="95%"></swiper-item>
      <swiper-item class="black"><img src="../assets/home/banner.png" width="95%"></swiper-item>
      <swiper-item class="black"><img src="../assets/home/banner.png" width="95%"></swiper-item>
      <swiper-item class="black"><img src="../assets/home/banner.png" width="95%"></swiper-item>
      <swiper-item class="black"><img src="../assets/home/banner.png" width="95%"></swiper-item>
      <swiper-item class="black"><img src="../assets/home/banner.png" width="95%"></swiper-item>
      <swiper-item class="black"><img src="../assets/home/banner.png" width="95%"></swiper-item>
      <swiper-item class="black"><img src="../assets/home/banner.png" width="95%"></swiper-item>
    </swiper>
    <div class="shoplist">
      <h4>——附近商家——</h4>
      <div ><router-link  v-for="(list,id) in $store.state.shopData.shop" :to="'shopPage/'+id" >
        <li class="list" @click="get(id)" >
          <div class="shop_pic"><img :src="list.logo"></div>
          <div class="text"><h4>{{list.name}}</h4>
            <span>月售：{{list.monthSell}}份&nbsp&nbsp&nbsp&nbsp{{list.time[0]}}分钟&nbsp&nbsp&nbsp&nbsp{{list.time[1]}}km</span><br>
            <span>起送：{{list.place[0]}}&nbsp&nbsp&nbsp&nbsp 配送：{{list.place[1]}} &nbsp&nbsp&nbsp&nbsp人均：{{list.place[2]}}km</span>
          </div>
        </li>
      </router-link></div>
    </div>
  </div>
</template>
<script>
  import { Search, Group, Cell, XButton } from 'vux'
  import { Swiper, GroupTitle, SwiperItem, Divider } from 'vux'

  export default {
    data(){
      return{
        results: [],
        value: '',
        nav1:[
          {img:require('../assets/home/meishi.png'),name:'美食'},
          {img:require('../assets/home/chaoshi.png'),name:'美团超市'},
          {img:require('../assets/home/shengxian.png'),name:'生鲜果蔬'},
          {img:require('../assets/home/xiawu.png'),name:'下午茶'},
          {img:require('../assets/home/xiaoyuan.png'),name:'校园优选'},
          {img:require('../assets/home/meituan.png'),name:'美团专送'},
          {img:require('../assets/home/kuaishi.png'),name:'快食简餐'},
          {img:require('../assets/home/paotui.png'),name:'跑腿代购'}

          ]
      }
    },
    components: {
      Search,
      Group,
      Cell,
      Swiper,
      SwiperItem,
      GroupTitle,
      XButton,
      Divider
    },
    methods: {

      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('等待开发')
      },
      getResult (val) {
        this.results = val ? getResult(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
      },
      list(){
        var oList = document.getElementById("nav").getElementsByTagName("li");
        for(let i=0;i<oList.length;i++){
          oList[i].index = i;
          oList[i].addEventListener('touchstart',function (e) {
//            alert(1)
            this.style.backgroundColor="#000000";
          })
        }
      },
      search(){
        var oSearch = document.getElementById("search");
        window.onscroll = function(){
          if(oSearch.offsetTop-document.body.scrollTop<=0&&oSearch.offsetTop!=0){
            oSearch.style.top='0px'
            oSearch.style.position='fixed'
          }else if(document.body.scrollTop<=47){
            oSearch.style.top='47px'
            oSearch.style.position='absolute'
          }
        }

      },
      get(num){
        this.$store.state.shopData.a =num
      }
    },
    mounted(){
//      this.list()
      this.search()
    }
  }
  function getResult (val) {
    let rs = []
    for (let i = 0; i < 5; i++) {
      rs.push({
        title: `${val}:搜索结果${i + 1}`,
        other: i
      })
    }
    return rs
  }
</script>
