import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  INCLUDE_JOB_ORG,
  INCLUDE_JOB_TYPE,
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
  [INCLUDE_JOB_ORG]: (state) => (job) => {
    if (state.selectedOrganizations.length === 0) return true;
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_TYPE]: (state) => (job) => {
    if (state.selectedJobTypes.length === 0) return true;
    return state.selectedJobTypes.includes(job.jobType);
  },
  [FILTERED_JOBS](state, getters) {
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_ORG(job))
      .filter((job) => getters.INCLUDE_JOB_TYPE(job));
  },
};

export default getters;
