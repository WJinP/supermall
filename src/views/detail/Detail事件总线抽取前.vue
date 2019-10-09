<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" ref="scroll">
            <detail-swiper :topImages='topImages'></detail-swiper>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <good-list :goods="recommendList"></good-list>
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

export default {
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
            itemImgListener:null

        }
    },

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
          }
        })
        //3.请求推荐数据
        getRecommend().then(res=>{
            // console.log(res)
            this.recommendList = res.data.list

        })

    },
    mounted() {
      const refresh=debounce(this.$refs.scroll.refresh,500)
      this.itemImgListener=()=>{
          refresh(); 
      }
      this.$bus.$on('itemImageLoad',)
    },
    methods: {
        imageLoad(){
           this.$refs.scroll.refresh()
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