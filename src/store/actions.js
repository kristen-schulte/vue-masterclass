import getJobs from "@/api/getJobs";
import { FETCH_JOBS, RECEIVE_JOBS } from "./constants";

const actions = {
  [FETCH_JOBS]: async (context) => {
    const data = await getJobs();
    context.commit(RECEIVE_JOBS, data);
  },
};

export default actions;
