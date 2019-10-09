const mutations = {
            //mutations唯一的目的就是修改state中的状态
        //mutations中的方法尽可能完成的时间比较单一一点
       /* addCart(state,payload){
            //payload新添加的商品，如果已经有了就数量增加
            //法一：
            // let oldProduct=null;
            // for( let item of state.cartList){
            //     if(item.iid===payload.iid){
            //         oldProduct=item;
            //     }
            // }
            //法二一步解决 查找之前数组中是否含有该商品
            let oldProduct=state.cartList.find(item=>item.iid===payload.iid)
            //2.判断oldProduct
            if(oldProduct){
                oldProduct.count+=1
            }else{
                payload.count=1;
                state.cartList.push(payload)
            }      
        }*/
        addCounter(state,payload){
            payload.count++
        },
        addToCart(state,payload){
            state.cartList.push(payload)
        }
}

export default mutations