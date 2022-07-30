import { mount } from "@vue/test-utils";
import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

function createConfig(props = {}) {
  return {
    global: {
      stubs: { FontAwesomeIcon: true },
    },
    props: {
      header: "Header",
      uniqueValues: new Set(["Value-A", "Value-B"]),
      mutations: "mutation",
      ...props,
    },
  };
}

describe("JobFiltersSidebarCheckboxGroup", () => {
  it("renders unique list of values for filtering jobs", async () => {
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const typeLabels = wrapper.findAll("[data-test='value']");
    const types = typeLabels.map((node) => node.text());
    expect(types).toEqual(["Value-A", "Value-B"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouter.mockReturnValue({ push: jest.fn() });
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      const props = {
        mutation: "SOME_MUTATION",
      };
      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const input1 = wrapper.find("[data-test='Value-A']");
      await input1.setChecked();
      expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Value-A"]);
    });
  });

  it("navigates user to home job results page", async () => {
    useStore.mockReturnValue({ commit: jest.fn() });
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const input1 = wrapper.find("[data-test='Value-A']");
    await input1.setChecked();
    expect(push).toHaveBeenCalledWith({ name: "JobResults" });
  });
});
