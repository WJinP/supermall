const actions={
    addCart(context,payload){
        // addCart({state,commit},payload){
            //payload新添加的商品，如果已经有了就数量增加
            //法二一步解决 查找之前数组中是否含有该商品
            let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
            //2.判断oldProduct
            if(oldProduct){
                // oldProduct.count+=1
                context.commit('addCounter',oldProduct)
            }else{
                payload.count=1;
                // state.cartList.push(payload)
                context.commit('addToCart',payload)
            }      
        }        
}
export default actions