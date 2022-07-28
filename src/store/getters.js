import { UNIQUE_ORGANIZATIONS, FILTER_JOBS_ORGS } from "./constants";

const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrgs = new Set();
    state.jobs.forEach((job) => {
      uniqueOrgs.add(job.organization);
    });
    return uniqueOrgs;
  },
  [FILTER_JOBS_ORGS](state) {
    if (state.selectedOrganizations.length === 0) {
      return state.jobs;
    }

    return state.jobs.filter((j) =>
      state.selectedOrganizations.includes(j.organization)
    );
  },
};

export default getters;
