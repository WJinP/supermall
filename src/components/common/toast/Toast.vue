<!-- 组件说明 -->
<template>
    <div class='toast' v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
//import x from ''
export default {
    name: 'Toast',
    // props:{
    //     msg:{
    //         type:String,
    //         default:''
    //     },
    //     show:{
    //         type:Boolean,
    //         default:false
    //     }
    // },
    components: {

    },
    data () {
        return {
            message:'',
            isShow:false

        };
    },
    computed: {

    },
    methods: {
        show(message,duration=2000){
            this.isShow=true;
            this.message=message;
            setTimeout(() => {
                this.isShow=false
                this.message=''
            }, duration);
        }

    },
    mounted() {

},
    }
</script>

<style lang='' scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    color: #fff;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.6);
    z-index: 999;
}
</style>