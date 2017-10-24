import login from '../components/login.vue'
import register from '../components/register.vue'
import shopPage from '../pages/shopPage.vue'
import admin from '../pages/admin.vue'
import buyNow from '../pages/buyNow.vue'
import buyList from '../components/buyList.vue'
import PingJia from '../components/pingjia.vue'
import XiangQing from '../components/xiangqing.vue'
import Home from '../components/home.vue'
import Me from '../components/me.vue'
import Allbuy from '../components/allbuy.vue'
export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/me',
    component: Me
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/register',
    component:register
  },

  {
    path:'/admin',
    component:admin
  },
    {
    path:'/buyNow/:id',
    component:buyNow
  },
  {
    path:'/Allbuy',
    component:Allbuy

  },
  {
    path: '/shopPage/:id',
    component: shopPage,
    children: [  //子路由
      {
        path: '/',//子路由的首页
        //redirect: 'buyList/:0',
       component:buyList
      },
      {
        path: 'PingJia',
        component:PingJia
      },
      {
        path: 'XiangQing',
        component:XiangQing
      }
    ]
  }

]
