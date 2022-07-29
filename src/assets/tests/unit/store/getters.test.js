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

  describe("FILTER_JOBS_ORGS", () => {
    it("identifies jobs that match the selected orgs", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ],
        selectedOrganizations: ["Google", "Microsoft"],
      };
      const filteredJobs = getters.FILTER_JOBS_ORGS(state);
      expect(filteredJobs).toEqual([
        { organization: "Google" },
        { organization: "Microsoft" },
      ]);
    });

    describe("when no orgs selected", () => {
      it("returns all jobs", () => {
        const state = {
          jobs: [
            { organization: "Google" },
            { organization: "Amazon" },
            { organization: "Microsoft" },
          ],
          selectedOrganizations: [],
        };
        const filteredJobs = getters.FILTER_JOBS_ORGS(state);
        expect(filteredJobs).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ]);
      });
    });
  });

  describe("FILTER_JOBS_TYPES", () => {
    it("identifies jobs that match the selected job types", () => {
      const state = {
        jobs: [
          { jobType: "Full-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
        ],
        selectedJobTypes: ["Full-time", "Part-time"],
      };
      const filteredJobs = getters.FILTER_JOBS_TYPES(state);
      expect(filteredJobs).toEqual([
        { jobType: "Full-time" },
        { jobType: "Part-time" },
      ]);
    });

    describe("when no job types selected", () => {
      it("returns all jobs", () => {
        const state = {
          jobs: [
            { jobType: "Full-time" },
            { jobType: "Temporary" },
            { jobType: "Part-time" },
          ],
          selectedJobTypes: [],
        };
        const filteredJobs = getters.FILTER_JOBS_TYPES(state);
        expect(filteredJobs).toEqual([
          { jobType: "Full-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
        ]);
      });
    });
  });
});
