import getters from "@/store/getters";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique orgs from list of jobs", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const state = {
        jobs: [
          { jobType: "Full-time" },
          { jobType: "Temporary" },
          { jobType: "Full-time" },
        ],
      };
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  describe("INCLUDE_JOB_ORG", () => {
    describe("when no organizations selected", () => {
      it("includes job", () => {
        const state = {
          selectedOrganizations: [],
        };
        const job = { organization: "Google" };
        const result = getters.INCLUDE_JOB_ORG(state)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is in an organization", () => {
      const state = {
        selectedOrganizations: ["Google", "Microsoft", "Amazon"],
      };
      const job = { organization: "Google" };
      const result = getters.INCLUDE_JOB_ORG(state)(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_TYPE", () => {
    describe("when no job types selected", () => {
      it("includes job", () => {
        const state = {
          selectedJobTypes: [],
        };
        const job = { jobType: "Part-time" };
        const result = getters.INCLUDE_JOB_TYPE(state)(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is of a type", () => {
      const state = {
        selectedJobTypes: ["Full-time", "Part-time"],
      };
      const job = { jobType: "Part-time" };
      const result = getters.INCLUDE_JOB_TYPE(state)(job);
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

      const job = { id: 1, title: "Job I Found" };
      const state = {
        jobs: [job],
      };

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_ORG).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
