import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  INCLUDE_JOB_ORG,
  INCLUDE_JOB_TYPE,
  UNIQUE_DEGREES,
  INCLUDE_JOB_DEGREE,
} from "@/store/constants";
import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";

interface IncludeJobGetters {
  INCLUDE_JOB_ORG: (job: Job) => boolean,
  INCLUDE_JOB_TYPE: (job: Job) => boolean,
  INCLUDE_JOB_DEGREE: (job: Job) => boolean,
}

const getters = {
  [UNIQUE_ORGANIZATIONS](state: GlobalState) {
    const uniqueOrgs = new Set<string>();
    state.jobs.forEach((job) => {
      uniqueOrgs.add(job.organization);
    });
    return uniqueOrgs;
  },
  [UNIQUE_JOB_TYPES](state: GlobalState) {
    const uniqueJobTypes = new Set<string>();
    state.jobs.forEach((job) => {
      uniqueJobTypes.add(job.jobType);
    });
    return uniqueJobTypes;
  },
  [UNIQUE_DEGREES]: (state: GlobalState) => {
    return state.degrees.map((item) => item.degree);
  },
  [INCLUDE_JOB_ORG]: (state: GlobalState) => (job: Job) => {
    if (state.selectedOrganizations.length === 0) return true;
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_TYPE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedJobTypes.length === 0) return true;
    return state.selectedJobTypes.includes(job.jobType);
  },
  [INCLUDE_JOB_DEGREE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedDegrees.length === 0) return true;
    return state.selectedDegrees.includes(job.degree);
  },
  [FILTERED_JOBS](state: GlobalState, getters: IncludeJobGetters) {
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_ORG(job))
      .filter((job) => getters.INCLUDE_JOB_TYPE(job))
      .filter((job) => getters.INCLUDE_JOB_DEGREE(job));
  },
};

export default getters;
