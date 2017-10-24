// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import routes from './router/index'
import Vue from 'vue';
import vuex from 'vuex';
import VueRouter from 'vue-router'
import store from './store'
Vue.use(VueRouter)
Vue.use(vuex)
//创建路由
//const router = new VueRouter({
  //routes
//});

const router=new VueRouter({
  routes
})
router.beforeEach(function(to,from,next){
  var logined=true
  if(!logined && to.path=='/pay'){
    next('/login')
  }else{
    next()
  }
})
router.afterEach(function(to,from){
})
//将store, router加入并生成应用
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
