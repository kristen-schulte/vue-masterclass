import { mount } from "@vue/test-utils";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

function createConfig($store) {
  return {
    global: {
      mocks: {
        $store,
      },
      stubs: { FontAwesomeIcon: true },
    },
  };
}

describe("JobFiltersSidebarJobTypes", () => {
  it("renders unique list of job types for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Type-1", "Type-2"]),
      },
    };
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig($store));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const typeLabels = wrapper.findAll("[data-test='job-type']");
    const types = typeLabels.map((node) => node.text());
    expect(types).toEqual(["Type-1", "Type-2"]);
  });

  it("communicates that user has selected checkbox for job type", async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Type-1", "Type-2"]),
      },
      commit,
    };
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig($store));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const input1 = wrapper.find("[data-test='Type-1']");
    await input1.setChecked();
    expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", ["Type-1"]);
  });
});
