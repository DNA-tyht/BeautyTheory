import { createStore } from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

const state = {
  cartList: [],
};

export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
  }
})
