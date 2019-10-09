<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref='nav'/>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="param" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <good-list :goods="recommendList"  ref="recommend"></good-list>
        </scroll>

    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
 import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodList from 'components/content/goods/GoodList'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin'

export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,GoodList

    },
    data () {
        return {
            iid:null,
            topImages: [],
            goods:{},
            shop: {},
            detailInfo:{},
            paramInfo: {},
            commentInfo: {},
            recommendList: [],
            themeTopYs: [],
            getThemeTopY:null,
            currentIndex: 0
            

        }
    },
    mixins:[itemListenerMixin],
    created() {
         // 1.保存传入的iid
        this.iid=this.$route.query.iid;
        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            // console.log(res)
            const data=res.result;
             // 1.获取顶部的图片轮播数据
            this.topImages=data.itemInfo.topImages
            //2.获取商品信息
            this.goods=new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //3.创建店铺信息
            this.shop = new Shop(data.shopInfo)
            //4.保存商品的详情数据
            this.detailInfo = data.detailInfo;
            // 5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //6.保存评论信息
            if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
              //第一次值不对
              //原因：this.$refs.param.$el，this.$refs.recommend.$el压根没有渲染
                // this.themeTopYs=[]
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                // console.log(this.themeTopYs)
            //第2次获取依然不对
            //原因：图片没有计算在内
            //根据最新的数据，对应的DOM是已经被渲染出来的，但是图片依然没有加载完
            //目前offsetTop是不包含全部图片的
            //offsetTop值不对的时候基本都是图片的问题
              // this.$nextTick(()=>{
              //   this.themeTopYs=[]
              //   this.themeTopYs.push(0);
              //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
              //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
              //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
              //   console.log(this.themeTopYs)
              // })            
          }
        })
        //3.请求推荐数据
        getRecommend().then(res=>{
            // console.log(res)
            this.recommendList = res.data.list

        })
        //4.给getThemeTopY赋值
        this.getThemeTopY=debounce(()=>{
          this.themeTopYs=[]
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          
          console.log(this.themeTopYs) 
        },500)

    },
    mounted() {
      // const refresh=debounce(this.$refs.scroll.refresh,500)
      // this.itemImgListener=()=>{
      //     refresh(); 
      // }
      // this.$bus.$on('itemImageLoad',this.itemImgListener)

    },
    updated() {


    },
    methods: {
        imageLoad(){
          //法一：不用防抖
          //  this.$refs.scroll.refresh()
          //法二：利用防抖
          this.refresh() 
          //对赋值操作进行防抖
          this.getThemeTopY()
        },
        titleClick(index){
          // console.log(index);
          // console.log(this.themeTopYs[index])
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
        contentScroll(position){
          // console.log(position)
          //1.获取y值
          const positionY=-position.y
          // console.log(positionY)
          //2.positionY和主题中的值进行对比 [0, 6619, 7380, 7691]
          //positionY在0和6619之间 index=0
          //positionY在6619和7380之间 index=1
          // for(let i in this.themeTopYs){
            // console.log(i) 索引值 类型是个字符串
            //i+1会有问题 字符串拼接  可以给i*1
            //i+1会有越界问题 最后一个位置undefined 所以要分两种情况
            let length=this.themeTopYs.length;
            for(var i=0;i<length;i++){
            // if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
            //   console.log(i)
            // }
            //正确做法一
            if(this.currentIndex !== i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) || (i===length-1 && positionY>=this.themeTopYs[i]))){
              this.currentIndex=i;
                console.log(this.currentIndex)
                this.$refs.nav.currentIndex=this.currentIndex
            }


          }





        }


    },
    destroyed() {//设置keep-alive时，进入页面时触发
        //1.取消全局事件的监听
        
        this.$bus.$off('itemImageLoad',this.itemImgListener)
        
    },  
 
    
}
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>