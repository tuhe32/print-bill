import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/page/home').default
    },
    //青浦区发票收据
    {path: '/printQPQBill', component:  require('@/page/printQPQBill/printQPQBill').default,name: 'printQPQBill',},
    {
      path: '*',
      redirect: '/'
    }
  ]
})
