import getters from "@/store/getters";
import { createState, createJob } from "./utils";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique orgs from list of jobs", () => {
      const job1 = createJob({ organization: "Google" });
      const job2 = createJob({ organization: "Amazon" });
      const startingState = createState({ jobs: [job1, job2, job1] });
      const result = getters.UNIQUE_ORGANIZATIONS(startingState);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const job1 = createJob({ jobType: "Full-time" });
      const job2 = createJob({ jobType: "Temporary" });
      const startingState = createState({ jobs: [job1, job2, job1] });
      const result = getters.UNIQUE_JOB_TYPES(startingState);
      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  describe("INCLUDE_JOB_ORG", () => {
    describe("when no organizations selected", () => {
      it("includes job", () => {
        const startingState = createState({ selectedOrganizations: [] });
        const job1 = createJob({ organization: "Google" });
        const result = getters.INCLUDE_JOB_ORG(startingState)(job1);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is in an organization", () => {
      const startingState = createState({ selectedOrganizations: ["Google", "Microsoft", "Amazon"] });
      const job1 = createJob({ organization: "Google" });
      const result = getters.INCLUDE_JOB_ORG(startingState)(job1);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_TYPE", () => {
    describe("when no job types selected", () => {
      it("includes job", () => {
        const startingState = createState({ selectedJobTypes: [] });
        const job = createJob({ jobType: "Part-time" });
        const result = getters.INCLUDE_JOB_TYPE(startingState)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is of a type", () => {
      const startingState = createState({
        selectedJobTypes: ["Full-time", "Part-time"],
      });
      const job = createJob({ jobType: "Part-time" });
      const result = getters.INCLUDE_JOB_TYPE(startingState)(job);
      expect(result).toBe(true);
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization and job type", () => {
      const INCLUDE_JOB_ORG = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_TYPE = jest.fn().mockReturnValue(true);

      const mockGetters = {
        INCLUDE_JOB_ORG,
        INCLUDE_JOB_TYPE,
      };

      const job = createJob({ id: 1, title: "Job I Found" });
      const startingState = createState({ jobs: [job] });
      const result = getters.FILTERED_JOBS(startingState, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_ORG).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
