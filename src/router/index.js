import Vue from 'vue'
import Router from 'vue-router';
import Login from '@/components/login_in/login'
import Index from '@/components/index/index'
import Chart from '@/components/chart/chart'
import Order from '@/components/order/order'
import Manage from '@/components/backManage/backManage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart
    },
    {
      path : '/order',
      name : 'order',
      component : Order
    },
    {
      path : '/manage',
      name : 'manage',
      component : Manage
    }
  ]
})

