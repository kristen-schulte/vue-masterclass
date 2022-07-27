import { createStore } from "vuex";
import getJobs from "@/api/getJobs";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_JOBS = "RECEIVE_JOBS";
export const FETCH_JOBS = "FETCH_JOBS";

export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";

export const state = () => {
  return {
    isLoggedIn: false,
    jobs: [],
    selectedOrganizations: [],
  };
};

export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [LOGOUT_USER](state) {
    state.isLoggedIn = false;
  },
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, organizations) {
    state.selectedOrganizations = organizations;
  },
};

export const actions = {
  [FETCH_JOBS]: async (context) => {
    const data = await getJobs();
    context.commit(RECEIVE_JOBS, data);
  },
};

export const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrgs = new Set();
    state.jobs.forEach((job) => {
      uniqueOrgs.add(job.organization);
    });
    return uniqueOrgs;
  },
};

const store = createStore({
  state,
  getters,
  mutations,
  strict: process.env.NODE_ENV !== "production",
  actions,
  // modules: {},
});

export default store;
