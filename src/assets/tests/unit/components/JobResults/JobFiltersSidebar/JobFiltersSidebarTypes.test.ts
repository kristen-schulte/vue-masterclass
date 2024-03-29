import { shallowMount } from "@vue/test-utils";
import { useUniqueJobTypes } from "@/store/composables";
jest.mock("@/store/composables");

const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;

import JobFiltersSidebarTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarTypes.vue";

describe("JobFiltersSidebarTypes", () => {
  it("allows user to filter jobs by job types", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    const wrapper = shallowMount(JobFiltersSidebarTypes);
    const filter = wrapper.findComponent({ name: "JobFiltersSidebarCheckboxGroup" });
    const { uniqueValues, mutation } = filter.props();
    expect(uniqueValues).toEqual(new Set(["Full-time", "Part-time"]));
    expect(mutation).toBe("ADD_SELECTED_JOB_TYPES");
  });
});
