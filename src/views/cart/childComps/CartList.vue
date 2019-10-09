<!-- 组件说明 -->
<template>
    <div class='cart-list'>        
        <cart-list-item v-for='(item,index) in cartList' :key="index" :item-info="item"></cart-list-item>        
    </div>
</template>

<script>
import CartListItem from './CartListItem'

export default {
    name: 'CartList',
    components: {
        CartListItem,
        
    },
    props: {
        cartList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    }
</script>

<style lang='' scoped>
/* .content{
    height: calc(100%-44px-49px);
} */
</style>