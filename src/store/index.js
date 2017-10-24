import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
//引入某个store对象
import adminData from '../../static/data/admin.js';
import shop from '../../static/data/shop.js';
import foot from '../../static/data/foot.js'
export default new vuex.Store({
  modules: {
    admin: adminData,
    shopData:shop,
    footData:foot
  }
})
