<!-- 组件说明 -->
<template>
    <div id="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>  
        <!-- 商品列表 -->
        <scroll class="content"  ref="scroll">
            <cart-list :cart-list="cartList"></cart-list>
        </scroll>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/nav/Nav'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        CartBottomBar,
        Scroll
    },
    data () {
        return {
            

        };
    },
    computed: {
        //两种语法
        ...mapGetters(['cartCount','cartList']),
        //可自己重命名成其他
        // ...mapGetters({
        //     '自己想叫的名字1':'cartCount',
        //     '自己想叫的名字2':'cartList'
        // })
    },
    activated() {
        // console.log('--')
        this.$refs.scroll.refresh()
    },

    }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  /* .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  } */
  .content{
    position: absolute;
    top: 44px;
    bottom: 93px;
    width: 100%;
    overflow: hidden;
  }
</style>
