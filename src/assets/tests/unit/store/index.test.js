import { state, mutations } from "@/store";

describe("state", () => {
  it("tracks whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

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
  });
});
