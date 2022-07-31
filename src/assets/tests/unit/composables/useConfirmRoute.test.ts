import { useRoute } from "vue-router";
jest.mock("vue-router");

import useConfirmRoute from "@/composables/useConfirmRoute";

const useRouteMock = useRoute as jest.Mock;

describe("useConfirmRoute", () => {
  it("determins if page router matches specified", () => {
    const routeName = "Home";
    useRouteMock.mockReturnValue({ name: routeName });
    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true);
  });
});
