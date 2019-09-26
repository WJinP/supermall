<!-- 组件说明 -->
<template>
    <div id='Home'>
        <nav-bar class="home-nav">
            <div slot='center'>购物街</div>
        </nav-bar> 
        <home-swiper :banners='banners'/>
        <recommend-view :recommends='recommends'/>

    </div>
</template>

<script>
import {getHomeMultidata} from 'network/home.js'
import NavBar from 'components/common/nav/Nav'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView

    },
    data () {
        return {
            banners:[],
            recommends:[],

        };
    },
    created(){
        //请求数据
        getHomeMultidata().then(res=>{
            // console.log(res);
            this.banners=res.data.banner.list
            this.recommends=res.data.recommend.list
        })
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
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
}
</style>