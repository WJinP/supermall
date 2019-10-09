<!-- 组件说明 -->
<template>
    <div class="goods-item" @click="itemClick">
        <img v-lazy="showImage" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
//import x from ''
export default {
    name: 'GoodListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed: {
      showImage(){
        return this.goodsItem.image ||  this.goodsItem.show.img || this.goodsItem.img
      }
    },
    methods: {
      imageLoad(){//监听图片是否加载完成
      //console.log('imageload')
      //首页和详情页的推荐都需要监听图片是否加载完毕
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeItemImageLoad')
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailItemImageLoad')
      // }
      this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        // console.log('跳转到详情页')
        this.$router.push({
          path:'/detail',
          query:{iid:this.goodsItem.iid}
        })
      // this.$router.push('/detail/'+this.goodsItem.iid)
      // console.log(this.goodsItem.iid)
      }


    },

    }
</script>

<style lang='' scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>