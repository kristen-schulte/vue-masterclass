import mutations from "@/store/mutations";

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state).toEqual({ isLoggedIn: true });
    });
  });

  describe("LOGOUT_USER", () => {
    it("logs the user out", () => {
      const state = { isLoggedIn: true };
      mutations.LOGOUT_USER(state);
      expect(state).toEqual({ isLoggedIn: false });
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API response", () => {
      const state = { jobs: [] };
      mutations.RECEIVE_JOBS(state, ["Job 1", "Job 2"]);
      expect(state).toEqual({ jobs: ["Job 1", "Job 2"] });
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates orgs that the user has chosen to filter jobs", () => {
      const state = { selectedOrganizations: [] };
      mutations.ADD_SELECTED_ORGANIZATIONS(state, ["Org 1", "Org 2"]);
      expect(state).toEqual({ selectedOrganizations: ["Org 1", "Org 2"] });
    });
  });
});
