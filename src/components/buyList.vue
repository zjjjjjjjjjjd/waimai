<template>
  <div>
    <div class="shop-list" id="shop-list">
      <ul class="menu-list" id="menu-list">
        <li v-for="(list,id) in $store.state.shopData.shop[index].tc" @click=choose($event)>
          {{list}}
        </li>
      </ul>
      <div class="food-list" id="food-list">
        <ul  v-for="(list,id) in $store.state.shopData.shop[index].tc"  >
          <h5>{{list}}</h5>
          <li class="buy_list"  v-if='list.tt[id]'  v-for="(list,num) in $store.state.shopData.shop[index].food">
            <div class="info">
              <div class="food_img"><img :src="list.pic"></div>
              <div class="buy_text">
                <h4>{{list.title}}</h4>
                <span>月售{{list.sell}}  </span>
                <span>赞{{list.zan}}</span>
                <h3 class="red">￥:{{list.pay}}</h3>
              </div>
            </div>
            <div class="btn">
              <button @click="del(list.pay,num,$event)" class="del">-</button>
              <span> {{list.num}} </span>
              <button @click="add(list.pay,num,$event)" class="add">+</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-content" id="cart-content" style="display: none;">
      <div class="opa" @click="cartshop"  @touchmove.prevent></div>
        <div class="header" @click="clearcart"><span>已选商品</span><span><img src="../assets/shop/clear.png" width="17px">清空购物车</span></div>
        <li v-for="(list,i) in $store.state.shopData.shop[index].food" v-if="list.num>0">
          <span>{{list.title}}</span>
          <div class="btn">
            <span>￥{{list.num*list.pay}}</span>
            <button @click="del(list.pay,i,$event)" class="del">-</button>
            <span> {{list.num}}</span>
            <button @click="add(list.pay,i,$event)" class="add">+</button>
          </div>
      </li>
    </div>
    <div class="pay-end" @touchmove.prevent>
      <div class="opa"></div>
      <div class="pay">
        <div class="img" @click="cartshop"><img :src=cart[num] width="60px;" id="cart"><div class="ico" id="ico">{{cartnum}}</div></div>

        <div class="pay_all" @click="cartshop">
          <p>￥：{{this.$store.state.shopData.shop[this.$store.state.shopData.a].money}}</p>
          <p>另需配送费￥{{this.$store.state.shopData.shop[index].place[1]}}</p>

        </div>
        <button @click="goPay" class="gopay">去结算</button>
      </div>

    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        cartnum:this.$store.state.shopData.shop[this.$route.params.id].paynum,
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
      add(num,index,e){
        this.num=1;//修改购物车图标
        this.$store.state.shopData.shop[this.$store.state.shopData.a].money +=parseInt(num)//将价格添加进结算价格
        if(!this.$store.state.admin.order[this.index]){//第一次添加进全部订单列表内
          this.$store.state.shopData.shop[this.index].food[index].num+=1;
//          this.$store.state.admin.order.unshift(this.$store.state.shopData.shop[this.index].food[index])
          this.$store.state.admin.order[this.index]=[];
          this.$store.state.admin.order[this.index].push(this.$store.state.shopData.shop[this.index].name)
          this.$store.state.admin.order[this.index].push(this.$store.state.shopData.shop[this.index].food[index])
        }else{
          //全部订单列表内已有订单
          this.$store.state.shopData.shop[this.index].food[index].num+=1;
          for(let i =0;i<this.$store.state.admin.order[this.index].length;i++){
            if(this.$store.state.admin.order[this.index][i].title==this.$store.state.shopData.shop[this.index].food[index].title){//循环遍历当前商品是否已经在全部订单内
              this.is=false;//赋值is为false,表示已存在相同商品
              break;
            }else{
              this.is=true;//赋值is为false,表示还未存在相同商品
            }
          }
          if(this.is){//未存在相同商品，把该商品信息添加进全部订单列表
            this.$store.state.admin.order[this.index].push(this.$store.state.shopData.shop[this.index].food[index]);
            !this.is//重置is
          }
        }
        document.getElementById("ico").style.display="block"
        this.$store.state.shopData.shop[this.index].paynum+=1;//增加购物车数量
        this.cartnum=this.$store.state.shopData.shop[this.index].paynum;
        this.add2()//跳转到add2()遍历全局内相同商品
      },
      del(num,index,e){

        if(this.$store.state.shopData.shop[this.index].food[index].num>1){//商品数量大于一就进行减1和减少结算价格操作
          this.$store.state.shopData.shop[this.$store.state.shopData.a].money -=parseInt(num)
          this.$store.state.shopData.shop[this.index].food[index].num-=1;

        }else if(this.$store.state.shopData.shop[this.index].food[index].num==1){//当商品数量只为1时，减少将使数量为0时触发

          this.$store.state.shopData.shop[this.$store.state.shopData.a].money -=parseInt(num)
          this.$store.state.shopData.shop[this.index].food[index].num-=1

          for(let i =0;i<this.$store.state.admin.order[this.index].length;i++){//循环遍历删除全部订单中的对应订单
            if(this.$store.state.admin.order[this.index][i].title==this.$store.state.shopData.shop[this.index].food[index].title){
              this.$store.state.admin.order[this.index].splice(i,1);
            }
          }
        }
        this.$store.state.shopData.shop[this.index].paynum-=1;//减少购物车数量
        this.cartnum=this.$store.state.shopData.shop[this.index].paynum;
        if(this.$store.state.shopData.shop[this.index].paynum==0){
          document.getElementById("cart-content").style.display="none"
          this.num=0//切换购物车图标为空
          document.getElementById("ico").style.display="none"//购物车上的数量图标消失
        }
        this.del2()//遍历全局相同商品执行相同操作
      },
      goPay(){
        if(this.$store.state.admin.check==false){//判断是否已经登录
          alert('您好,请先登录!')
          this.$router.push('/login')//跳转到登录页面
        }else if(this.$store.state.shopData.shop[this.index].paynum==0){
          alert("请选择需要购买的商品")
        }else{
          this.$router.push('/buyNow/'+this.index)}//跳转到支付页面
      },
      choose(e){//点击菜单栏标签是将商品列表主题跳转到对应
        var oList = e.target.parentNode.childNodes;
        var oFood = document.getElementById("food-list").getElementsByTagName("ul")
        for(let i=0;i<oList.length;i++){//循环遍历通过商品列表各个主题高度获取该主题标题位置
          if(oList[i]==e.target){
            var num=0;
            for(let j=0;j<i;j++){
              num+=oFood[j].offsetHeight;
            }
            document.body.scrollTop=126+num;
          }
        }
        for(let i=0;i<oList.length;i++){
          oList[i].className=''
        }
        e.target.className="active";//循环遍历全部侧边菜单栏，只对当前点击的菜单栏标签高亮
      },
      del2(){
        setTimeout(function () {
          var oSpan = document.getElementsByClassName("btn");
          for(let i=0;i<oSpan.length;i++){
            if(oSpan[i].getElementsByTagName("span")[0].innerHTML==0){//遍历全局span内的innerHTML等于0则会隐藏减号和商品数量
              oSpan[i].getElementsByTagName("span")[0].parentNode.childNodes[0].style.display="none"
              oSpan[i].getElementsByTagName("span")[0].parentNode.childNodes[2].style.display="none"
            }
          }
        },1)//时间差作用同下

      },
      add2(){
        setTimeout(function () {
          var oSpan = document.getElementsByClassName("btn");//获取全局span标签
          for(let i=0;i<oSpan.length;i++){
            if(oSpan[i].getElementsByTagName("span")[0].innerHTML>0){//遍历全局span内的innerHTML大于0则会显示减号和商品数量
              oSpan[i].getElementsByTagName("span")[0].parentNode.childNodes[0].style.display="block"
              oSpan[i].getElementsByTagName("span")[0].parentNode.childNodes[2].style.display="block"
            }
          }
        },1)//此处必须有时间差，若没有将会有innerHTML  的bug（span内的innerHTML暂时不会因为num的更新而改变）
      },
      cartshop(){//判断是否已选择商品，在点击下方购物车和结算栏时弹出购物车列表
        if(this.$store.state.shopData.shop[this.index].paynum>0){
          if(document.getElementById("cart-content").style.display=="none"){
            document.getElementById("cart-content").style.display="block"
            document.body.style.overflowY='hidden'
          }else{
            document.getElementById("cart-content").style.display="none"
            document.body.style.overflowY='auto'
          }
        }else{
          document.getElementById("cart-content").style.display="none"
        }
      },
      clearcart(){
        var oSpan = document.getElementsByClassName("btn");
        for(let i=0;i<this.$store.state.shopData.shop[this.index].food.length;i++){//清空该店所有food数量
          if(this.$store.state.shopData.shop[this.index].food[i].num>0){
            this.$store.state.shopData.shop[this.index].food[i].num=0;
          }
        }
        for(let i=0;i<oSpan.length;i++){//隐藏所有减号和数量，并改变购物车图标
          oSpan[i].getElementsByTagName("span")[0].parentNode.childNodes[0].style.display="none"
          oSpan[i].getElementsByTagName("span")[0].parentNode.childNodes[2].style.display="none"
          this.num=0
        }
        document.getElementById("ico").style.display="none";//隐藏购物车数量图标
        this.$store.state.shopData.shop[this.index].paynum=0;//清空总数
        this.$store.state.shopData.shop[this.$store.state.shopData.a].money=0;//清空总价
        this.$store.state.admin.order[this.index].splice(1,this.$store.state.admin.order[this.index].length)//清空订单
        this.cartshop()
        document.body.style.overflowY='auto'
      }
    },
    mounted(){
      var oSpan = document.getElementsByClassName("btn");
      var oMenuList = document.getElementById("menu-list").getElementsByTagName("li");
      for(let i=0;i<oSpan.length;i++){
        if(oSpan[i].getElementsByTagName("span")[0].innerHTML==0){
          oSpan[i].getElementsByTagName("span")[0].parentNode.childNodes[0].style.display="none"
          oSpan[i].getElementsByTagName("span")[0].parentNode.childNodes[2].style.display="none"
        }else{
          this.num=1;
        }
      }
      if(this.$store.state.shopData.shop[this.index].paynum==0){
        document.getElementById("ico").style.display="none";
      }

      oMenuList[0].className="active"
      document.body.scrollTop=0;
    }
  }
</script>
<style>
</style>
