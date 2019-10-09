<!-- 组件说明 -->
<template>
    <div class='check-botton' :class="{check:isChecked}">
        <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
//import x from ''
export default {
    name: 'CheckButton',
    props: {
        isChecked:{
            type:Boolean,
            default:false
        }
    },

    }
</script>

<style scoped>
  /* .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  } */
  .check-botton{
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;    
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
  .check{
      border-color: #ff8198;
      background-color: #ff8198; 
  }
</style>
