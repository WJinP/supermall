<!-- 组件说明 -->
<template>
    <div class='bottom-menu'>
      <check-button class="select-all" :is-checked='isSelectAll' @click.native="checkClick"></check-button>
      <span>全选</span>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
      <span class="buy-product" @click="calcClick">去计算({{checkedLength}})</span>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
    name: 'CartBottomBar',
    components: {
        CheckButton

    },
    data () {
        return {

        };
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice(){
            // return this.$store.getters.cartList.filter(item=>{
            return this.cartList.filter(item=>{
                return item.checked
            }).reduce((pre,item)=>{
                return pre+item.price*item.count
            },0).toFixed(2)
        },
        checkedLength(){
            // return this.$store.state.cartList.filter(item=>{
            return this.cartList.filter(item=>{
                return item.checked
            }).length
        },
        isSelectAll(){
            //全选的状态 只要有一个未选中就是没选中状态 0->false 没数据的时候也是未选中
            //高阶函数
            // return !(this.cartList.filter(item=>{
            //     return !item.checked
            // }).length)
        //    return !this.cartList.find(item=>!item.checked)
        if(this.cartList.length===0) return false
        return !this.cartList.find(item=>!item.checked)
        //普通遍历
        // if(this.cartList.length===0) return false        
        // for(let item of this.cartList){
        //     if(!item.checked){
        //         return false
        //     }
        // }
        // return true
        // }
        },
    },
    methods: {
        checkClick(){//点击全选按钮
        //如果原来都是选中的，点击一次全部不选中
        //如果原来都不选中或有某些不选中，点击一次，全部选中
        if(this.isSelectAll){//全部选中
            this.cartList.forEach(item=>item.checked=false)
        }else{//都不选中或有某些不选中
            this.cartList.forEach(item=>item.checked=true)
        }

        },
        calcClick(){
            if(!this.isSelectAll){
                this.$toast.show('请选择购买的商品',2000)
            }            
        }
    },
    mounted() {

},
    }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
