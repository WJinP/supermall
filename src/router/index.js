import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '',
      redirect:'/home'
    },
    {
      path:'/home',
      component:()=>import ('views/home/Home')
    },
    {
      path:'/categroy',
      component:()=>import ('views/category/Category')
    },
    {
      path:'/cart',
      component:()=>import ('views/cart/Cart')
    },
    {
      path:'/profile',
      component:()=>import ('views/profile/Profile')
    },
    {
      path:'/detail',
      component:()=>import ('views/detail/Detail')
    },
  ]
})
