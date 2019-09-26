<!-- 组件说明 -->
<template>
    <div class='recommend'>
        <div v-for='(item,index) in recommends' :key="index">
            <a :href="item.link">
                <img :src="item.image">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
//import x from ''
export default {
    name: '',
    components: {

    },
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    },
    }
</script>

<style lang='' scoped>
  .recommend {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
    justify-content: space-around;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>