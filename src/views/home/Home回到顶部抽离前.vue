<!-- 组件说明 -->
<template>
    <div id='Home'>
        <nav-bar class="home-nav">
            <div slot='center'>购物街</div>
        </nav-bar> 
        <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' ref='tabControl1' class="tab-control" v-show="isTabFixed"></tab-control>
        <scroll class="content" ref="scroll" :probe-type='3' @scroll='contentScroll' :pull-up-load='true' @pullingUp='loadMore'>
            <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>
            <recommend-view :recommends='recommends'/>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' ref='tabControl2'></tab-control>
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
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin'
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
    mixins:[itemListenerMixin],
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
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY: 0,
            

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
     mounted() {
        //3.监听item中图片加载完成
        //refresh千万别加(),refresh()相当于把这个函数的返回值传进去了，应该传函数
        // const refresh=debounce(this.$refs.scroll.refresh,500)
        // //对监听的事件进行保存
        // this.itemImgListener=()=>{
        //    refresh(); 
        // }
        // this.$bus.$on('itemImageLoad',this.itemImgListener)
        // // this.$bus.$on('itemImageLoad',()=>{
        // //     //console.log('---') 打印30次
        // //     //this.$refs.scroll.refresh()
        // //     refresh();
        // // })


    },
    destroyed() {//不设置keep-alive时离开页面时触发
        console.log('destroyed')
    },
    activated () {//设置keep-alive时，进入页面时触发
        // console.log('activated')
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated () {//设置keep-alive时，进入页面时触发
        // console.log('deactivated')
        //1.保存Y值
        this.saveY=this.$refs.scroll.getScrollY();
        //2.取消全局事件的监听
        this.$bus.$off('itemImageLoad',this.itemImgListener)
        
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
            this. getHomeGoods(this.currentType);
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
            this.$refs.tabControl1.currentIndex=index;
            this.$refs.tabControl2.currentIndex=index;
        },
        backClick(){//拿到组件对象的同时可以拿到他的data和methods
            this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
            // console.log(position)
            //1.判断BackTop是否显示
            // 三目写法this.isShowBackTop=(-position.y)>1000? true:false   
            //表达式写法 
            this.isShowBackTop=(-position.y)>1000   
            //2.决定 tab-control是否吸顶
            this.isTabFixed=(-position.y)>this.tabOffsetTop

        },
        //监听轮播图是否加载完
        swiperImageLoad(){
            //获取tabControl的offsetTop
            //所有的组件都有一个属性$el：用于获取组件中的元素
            //console.log(this.$refs.tabControl.$el.offsetTop)
            this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
        }








    },

    }
</script>

<style lang='' scoped>
#Home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
/* #Home{
       height: 100vh;
} */
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}

.content{
 overflow: hidden;
 position: absolute;
 top: 44px;
 bottom: 49px;
 left: 0;
 right: 0;
}
.tab-control{
    position: relative;
    z-index: 100;
}
/* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
} */
/* .content{
   
    height:calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
} */
</style>