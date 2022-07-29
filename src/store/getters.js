import {
  UNIQUE_ORGANIZATIONS,
  FILTER_JOBS_ORGS,
  UNIQUE_JOB_TYPES,
} from "./constants";

const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrgs = new Set();
    state.jobs.forEach((job) => {
      uniqueOrgs.add(job.organization);
    });
    return uniqueOrgs;
  },
  [UNIQUE_JOB_TYPES](state) {
    const uniqueJobTypes = new Set();
    state.jobs.forEach((job) => {
      uniqueJobTypes.add(job.jobType);
    });
    return uniqueJobTypes;
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
