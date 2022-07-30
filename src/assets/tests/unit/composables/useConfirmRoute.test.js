import { useRoute } from "vue-router";
jest.mock("vue-router");

import useConfirmRoute from "@/composables/useConfirmRoute";

describe("useConfirmRoute", () => {
  it("determins if page router matches specified", () => {
    const routeName = "Home";
    useRoute.mockReturnValue({ name: routeName });
    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true);
  });
});
