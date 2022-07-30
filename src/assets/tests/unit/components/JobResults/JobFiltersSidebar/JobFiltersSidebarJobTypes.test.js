import { mount } from "@vue/test-utils";
import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useUniqueJobTypes } from "@/store/composables";
jest.mock("@/store/composables");

import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

function createConfig() {
  return {
    global: {
      stubs: { FontAwesomeIcon: true },
    },
  };
}

describe("JobFiltersSidebarJobTypes", () => {
  it("renders unique list of job types for filtering jobs", async () => {
    useUniqueJobTypes.mockReturnValue(new Set(["Type-1", "Type-2"]));
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const typeLabels = wrapper.findAll("[data-test='job-type']");
    const types = typeLabels.map((node) => node.text());
    expect(types).toEqual(["Type-1", "Type-2"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job type", async () => {
      useRouter.mockReturnValue({ push: jest.fn() });
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useUniqueJobTypes.mockReturnValue(new Set(["Type-1", "Type-2"]));

      const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const input1 = wrapper.find("[data-test='Type-1']");
      await input1.setChecked();
      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", ["Type-1"]);
    });
  });

  it("navigates user to home job results page", async () => {
    useStore.mockReturnValue({ commit: jest.fn() });
    useUniqueJobTypes.mockReturnValue(new Set(["Type-1", "Type-2"]));
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const input1 = wrapper.find("[data-test='Type-1']");
    await input1.setChecked();

    expect(push).toHaveBeenCalledWith({ name: "JobResults" });
  });
});
