import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS,
  FILTER_JOBS_ORGS,
  UNIQUE_JOB_TYPES,
  FILTER_JOBS_TYPES,
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
  [FILTERED_JOBS](state) {
    return state.jobs
      .filter((job) => {
        if (state.selectedOrganizations.length === 0) {
          return true;
        }
        return state.selectedOrganizations.includes(job.organization);
      })
      .filter((job) => {
        if (state.selectedJobTypes.length === 0) {
          return true;
        }
        return state.selectedJobTypes.includes(job.jobType);
      });
  },
  [FILTER_JOBS_ORGS](state) {
    if (state.selectedOrganizations.length === 0) {
      return state.jobs;
    }

    return state.jobs.filter((j) =>
      state.selectedOrganizations.includes(j.organization)
    );
  },
  [FILTER_JOBS_TYPES](state) {
    if (state.selectedJobTypes.length === 0) {
      return state.jobs;
    }

    return state.jobs.filter((j) => state.selectedJobTypes.includes(j.jobType));
  },
};

export default getters;
