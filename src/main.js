import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import request from "@/request";
import router from "@/router";
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$request = request
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
