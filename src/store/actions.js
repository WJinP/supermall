import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
const actions={
    addCart(context,payload){
        // addCart({state,commit},payload){
            //payload新添加的商品，如果已经有了就数量增加
            //法二一步解决 查找之前数组中是否含有该商品
            /*let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
            //2.判断oldProduct
            if(oldProduct){
                // oldProduct.count+=1
                context.commit(ADD_COUNTER,oldProduct)
            }else{
                payload.count=1;
                // state.cartList.push(payload)
                context.commit(ADD_TO_CART,payload)
            } */     
            return new Promise((resolve,reject)=>{
                let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
                if(oldProduct){//数量+1
                    context.commit(ADD_COUNTER,oldProduct)
                    resolve('当前商品数量+1')
                }else{//添加商品
                    payload.count=1;
                    context.commit(ADD_TO_CART,payload)
                    resolve('添加新的商品')

                }
            })
        }        
}
export default actions