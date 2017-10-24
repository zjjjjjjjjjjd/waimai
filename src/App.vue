<template>
  <div id="app">
    <transition :name="animate"><router-view class="content"></router-view></transition>
    <foot-end v-if="$route.path=='/'||$route.path=='/Allbuy'||$route.path=='/me'||$route.path=='/login'||$route.path=='/register'||$route.path=='/admin'"></foot-end>
 </div>
</template>

<script>
  import FootEnd from './components/footer.vue'
  import '../static/style.css'
export default {
    data(){
      return{
        animate:'animate'
      }
    },
  components:{FootEnd},
  watch:{
      $route(to,from){
        if(from.path=="/shopPage/0"&&to.path=="/"||from.path=="/buyNow/0"||from.path=="/me"||from.path=="/Allbuy"&&to.path=="/"){
          this.animate="animate2"
        }else{
          this.animate="animate"
        }
    }
  }
}
</script>

<style>

</style>
