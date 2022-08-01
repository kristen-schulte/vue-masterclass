import { shallowMount } from "@vue/test-utils";

import { useUniqueDegrees } from "@/store/composables";
jest.mock("@/store/composables");
jest.mock("vuex");

const useUniqueDegreesMock = useUniqueDegrees as jest.Mock;

import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";

describe("JobFiltersSidebarDegrees", () => {
  it("allows user to filter jobs by degree", () => {
    useUniqueDegreesMock.mockReturnValue(["Associate", "Bachelor's"]);
    const wrapper = shallowMount(JobFiltersSidebarDegrees);
    const filter = wrapper.findComponent({ name: "JobFiltersSidebarCheckboxGroup" });
    const { uniqueValues, mutation } = filter.props();
    expect(uniqueValues).toEqual(["Associate", "Bachelor's"]);
    expect(mutation).toBe("ADD_SELECTED_DEGREES");
  });
});