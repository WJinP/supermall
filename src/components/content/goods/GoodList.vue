<!-- 组件说明 -->
<template>
    <div class='goods-list'>
        <good-list-item v-for='(item,index) in goods' :goods-item='item' :key="index"  class="item"/>
    </div>
</template>

<script>
import GoodListItem from './GoodListItem'
export default {
    name: 'GoodList',
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components: {
        GoodListItem
    },
    data () {
        return {

        };
    },
    computed: {

    },
    methods: {

    },
    mounted() {

},
    }
</script>

<style lang='' scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }
  .goods-list .item {
    width: 48%;
  }
</style>