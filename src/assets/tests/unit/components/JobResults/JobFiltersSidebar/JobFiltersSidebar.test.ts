import { shallowMount } from "@vue/test-utils";
jest.mock("vuex");

import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";

describe("JobFiltersSidebar", () => {
  it("sets up panel for filtering", () => {
    const wrapper = shallowMount(JobFiltersSidebar);
    expect(wrapper.exists()).toBe(true);
  });
});