import mutations from "@/store/mutations";
import { createState, createJob } from "./utils";

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const startingState = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(startingState);
      expect(startingState.isLoggedIn).toBe(true);
    });
  });

  describe("LOGOUT_USER", () => {
    it("logs the user out", () => {
      const startingState = createState({ isLoggedIn: true });
      mutations.LOGOUT_USER(startingState);
      expect(startingState.isLoggedIn).toBe(false);
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API response", () => {
      const startingState = createState({ jobs: [] });
      const job1 = createJob({ title: "Job 1" });
      const job2 = createJob({ title: "Job 2" });
      mutations.RECEIVE_JOBS(startingState, [job1, job2]);
      expect(startingState.jobs).toEqual([job1, job2]);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates orgs that the user has chosen to filter jobs", () => {
      const startingState = createState({ selectedOrganizations: [] });
      mutations.ADD_SELECTED_ORGANIZATIONS(startingState, ["Org 1", "Org 2"]);
      expect(startingState.selectedOrganizations).toEqual(["Org 1", "Org 2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates types that the user has chosen to filter jobs", () => {
      const startingState = createState({ selectedJobTypes: [] });
      mutations.ADD_SELECTED_JOB_TYPES(startingState, ["Type 1", "Type 2"]);
      expect(startingState.selectedJobTypes).toEqual(["Type 1", "Type 2"]);
    });
  });
});