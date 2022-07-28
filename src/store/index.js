import { createStore } from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  // modules: {},
  strict: process.env.NODE_ENV !== "production",
});

export default store;
