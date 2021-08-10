import {
  ADD_CART,
  ADD_COUNTER
} from "@/store/mutation-types";

export default {
  addCart(context, payload) {
    return new Promise(resolve => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前商品数量+1");
      } else {
        payload.count = 1;
        context.commit(ADD_CART, payload);
        resolve("当前商品添加购物车成功");
      }
    });
  }
}
