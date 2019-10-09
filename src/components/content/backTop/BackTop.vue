<!-- 组件说明 -->
<template>
    <div class='back-top'>
        <img src="~assets/img/common/top.png" alt="" srcset="">        
    </div>
</template>

<script>
//import x from ''
export default {
    name: 'BackTop',
    }
</script>

<style lang='' scoped>
.back-top{
    position: fixed;
    right: 10px;
    bottom: 55px;
    z-index: 99;

}
.back-top img{
    width: 43px;
    height: 43px;
}
</style>