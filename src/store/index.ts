import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { GlobalState } from "./types";

export const key: InjectionKey<Store<GlobalState>> = Symbol();

const store = createStore<GlobalState>({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== "production",
});

export default store;
