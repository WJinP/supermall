import {debounce} from './utils';
import BackTop from 'components/content/backTop/BackTop';

export const itemListenerMixin={
    data() {
        return {
            itemImgListener:null,
            refresh:null
        }
    },
    mounted() {
        this.refresh=debounce(this.$refs.scroll.refresh,500)
        this.itemImgListener=()=>{
            this.refresh(); 
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)
        // console.log('我是混入中的内容')
    },
}
export const backTopMixin={
    components: {
        BackTop
    },
    data () {
        return {
            isShowBackTop:false,
        }
    },
    methods: {
        backClick(){//拿到组件对象的同时可以拿到他的data和methods
            this.$refs.scroll.scrollTo(0,0)
          },
          listenShowBackTop(position){
            this.isShowBackTop=(-position.y)>1000 
          }
    }

}