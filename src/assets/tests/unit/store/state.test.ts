import state from "@/store/state";

describe("state", () => {
  it("tracks whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it("stores search terms for skills and qualifications", () => {
    const startingState = state();
    expect(startingState.skillsSearchTerm).toBe("");
  })

  it("stores organizations that the user would like to filter jobs", () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });

  it("stores job types that the user would like to filter jobs", () => {
    const startingState = state();
    expect(startingState.selectedJobTypes).toEqual([]);
  });

  it("stores all degree options", () => {
    const startingState = state();
    expect(startingState.degrees).toEqual([]);
  });

  it("stores degrees that the user would like to filter jobs", () => {
    const startingState = state();
    expect(startingState.selectedDegrees).toEqual([]);
  });
});
