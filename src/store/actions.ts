import { Commit } from "vuex";
import getJobs from "@/api/getJobs";
import getDegrees from "@/api/getDegrees";
import { FETCH_DEGREES, FETCH_JOBS, RECEIVE_DEGREES, RECEIVE_JOBS } from "./constants";

interface SimpleContext {
  commit: Commit;
}

const actions = {
  [FETCH_JOBS]: async (context: SimpleContext) => {
    const data = await getJobs();
    context.commit(RECEIVE_JOBS, data);
  },
  [FETCH_DEGREES]: async (context: SimpleContext) => {
    const data = await getDegrees();
    context.commit(RECEIVE_DEGREES, data);
  }
};

export default actions;
