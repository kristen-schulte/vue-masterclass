import { shallowMount } from "@vue/test-utils";

import { useUniqueJobTypes, useUniqueOrgs, useUniqueDegrees } from "@/store/composables";
jest.mock("@/store/composables");
jest.mock("vuex");

const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;
const useUniqueOrgsMock = useUniqueOrgs as jest.Mock;
const useUniqueDegreesMock = useUniqueDegrees as jest.Mock;

import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";

describe("JobFiltersSidebar", () => {
  it("sets up panel for filtering", () => {
    const wrapper = shallowMount(JobFiltersSidebar);
    expect(wrapper.exists()).toBe(true);
  })

  // beforeEach(() => {
  //   useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
  //   useUniqueOrgsMock.mockReturnValue(new Set(["AirBnB"]));
  //   useUniqueDegreesMock.mockReturnValue(["Associate", "Bachelor's"]);
  // })



  // it("allows user to filter jobs by organizations", () => {
  //   const wrapper = shallowMount(JobFiltersSidebar);
  //   const filter = wrapper.findComponent("[data-test='organizations-filter']");
  //   const { header, uniqueValues, mutation } = filter.props();
  //   expect(header).toBe("Organizations");
  //   expect(uniqueValues).toEqual(new Set(["AirBnB"]));
  //   expect(mutation).toBe("ADD_SELECTED_ORGANIZATIONS");
  // });

  // it("allows user to filter jobs by degree", () => {
  //   const wrapper = shallowMount(JobFiltersSidebar);
  //   const filter = wrapper.findComponent("[data-test='degrees-filter']");
  //   const { header, uniqueValues, mutation } = filter.props();
  //   expect(header).toBe("Degrees");
  //   expect(uniqueValues).toEqual(["Associate", "Bachelor's"]);
  //   expect(mutation).toBe("ADD_SELECTED_DEGREES");
  // });
})