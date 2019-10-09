<!-- 组件说明 -->
<template>
    <div id='Home'>
        <nav-bar class="home-nav">
            <div slot='center'>购物街</div>
        </nav-bar> 
        <scroll class="content" ref="scroll" :probe-type='3' @scroll='contentScroll' :pull-up-load='true' @pullingUp='loadMore'>
            <home-swiper :banners='banners'/>
            <recommend-view :recommends='recommends'/>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick='tabClick'></tab-control>
            <good-list :goods="showGoods"></good-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/nav/Nav'
import TabControl from 'components/content/tabControl/TabControl';
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
export default {
    name: 'Home',
    components: {        
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodList,
        Scroll,
        BackTop

    },
    data () {
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false

        };
    },
    created(){
        //请求数据
        this.getHomeMultidata();
        //请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

    },    
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    methods: {
        //网络请求相关
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
                // console.log(res);
                this.banners=res.data.banner.list
                this.recommends=res.data.recommend.list
            });
        },
        getHomeGoods(type){
            const page=this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page+=1;
                // 完成加载更多数据
                this.$refs.scroll.finishPullUp()
            })
        },
        loadMore(){
            this.getHomeGoods(this.currentType);
            //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
            this.$ref.scroll.scroll.refresh()
        },


        //事件监听相关
        tabClick(index){
            //console.log(index)
            switch(index){
                case 0: 
                this.currentType='pop'
                break
                case 1: 
                this.currentType='new'
                break
                case 2: 
                this.currentType='sell'
                break
            }
        },
        backClick(){//拿到组件对象的同时可以拿到他的data和methods
            this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
            // console.log(position)
            this.isShowBackTop=(-position.y)>1000? true:false          
        },








    },
    mounted() {

},
    }
</script>

<style lang='' scoped>
#Home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
}
/* #Home{
       height: 100vh;
} */
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}
.tab-control{
    position:sticky;
    top: 44px;
}
.content{
 overflow: hidden;
 position: absolute;
 top: 44px;
 bottom: 49px;
 left: 0;
 right: 0;
}
/* .content{
   
    height:calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
} */
</style>