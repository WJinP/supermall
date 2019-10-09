<!-- 组件说明 -->
<template>
    <div class=''>
        <swiper>
            <swiper-item v-for='(item,index) in banners' :key="index">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imageLoad">
                </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
//import x from ''
export default {
    name: '',
    components: {
        Swiper,
        SwiperItem
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data () {
        return {
            isLoad:false
        }
    },
    methods: {
        imageLoad(){
            if(!this.isLoad){
                //console.log('---')
                this.$emit('swiperImageLoad')
                this.isLoad=true
            }
        }
    },
 
    }
</script>

<style lang='' scoped>

</style>