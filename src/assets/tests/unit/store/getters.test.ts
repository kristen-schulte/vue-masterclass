import getters from "@/store/getters";
import { createState, createJob, createDegree } from "./utils";

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

  describe("UNIQUE_DEGREES", () => {
    it("extracts unique degree values", () => {
      const degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];
      const startingState = createState({ degrees });
      const result = getters.UNIQUE_DEGREES(startingState);
      expect(result).toEqual(["Master's", "Bachelor's"]);
    })
  })

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

  describe("INCLUDE_JOB_DEGREE", () => {
    describe("when no degrees selected", () => {
      it("includes job", () => {
        const startingState = createState({ selectedDegrees: [] });
        const job = createJob({ degree: "Bachelors" });
        const result = getters.INCLUDE_JOB_DEGREE(startingState)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is of a degree", () => {
      const startingState = createState({
        selectedDegrees: ["Master's", "Bachelors"],
      });
      const job = createJob({ degree: "Bachelors" });
      const result = getters.INCLUDE_JOB_DEGREE(startingState)(job);
      expect(result).toBe(true);
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization, job type, and degree", () => {
      const INCLUDE_JOB_ORG = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_TYPE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_DEGREE = jest.fn().mockReturnValue(true);

      const mockGetters = {
        INCLUDE_JOB_ORG,
        INCLUDE_JOB_TYPE,
        INCLUDE_JOB_DEGREE
      };

      const job = createJob({ id: 1, title: "Job I Found" });
      const startingState = createState({ jobs: [job] });
      const result = getters.FILTERED_JOBS(startingState, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_ORG).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_TYPE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_DEGREE).toHaveBeenCalledWith(job);
    });
  });
});
