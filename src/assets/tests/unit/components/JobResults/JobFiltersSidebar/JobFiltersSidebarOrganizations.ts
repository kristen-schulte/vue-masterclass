import { shallowMount } from "@vue/test-utils";

import { useUniqueOrgs } from "@/store/composables";
jest.mock("@/store/composables");
jest.mock("vuex");

const useUniqueOrgsMock = useUniqueOrgs as jest.Mock;

import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

describe("JobFiltersSidebarOrganizations", () => {
  it("allows user to filter jobs by organizations", () => {
    useUniqueOrgsMock.mockReturnValue(new Set(["AirBnB"]));
    const wrapper = shallowMount(JobFiltersSidebarOrganizations);
    const filter = wrapper.findComponent("[data-test='organizations-filter']");
    const { header, uniqueValues, mutation } = filter.props();
    expect(header).toBe("Organizations");
    expect(uniqueValues).toEqual(new Set(["AirBnB"]));
    expect(mutation).toBe("ADD_SELECTED_ORGANIZATIONS");
  });
});