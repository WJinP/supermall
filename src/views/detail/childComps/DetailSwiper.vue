<!-- 组件说明 -->
<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
        </swiper-item>
    </swiper>        
</template>

<script>
//import x from ''
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    name: 'detail-swiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
        topImages: {
        type: Array,
        default() {
            return []
        }
        }
    },
    data () {
        return {

        };
    },

    }
</script>

<style lang='' scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>