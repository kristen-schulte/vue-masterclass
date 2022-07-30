import { mount } from "@vue/test-utils";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

function createConfig($store, $router) {
  return {
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: { FontAwesomeIcon: true },
    },
  };
}

describe("JobFiltersSidebarJobTypes", () => {
  it("renders unique list of job types for filtering jobs", async () => {
    const $router = { push: jest.fn() };
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Type-1", "Type-2"]),
      },
    };
    const wrapper = mount(
      JobFiltersSidebarJobTypes,
      createConfig($store, $router)
    );

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const typeLabels = wrapper.findAll("[data-test='job-type']");
    const types = typeLabels.map((node) => node.text());
    expect(types).toEqual(["Type-1", "Type-2"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job type", async () => {
      const $router = { push: jest.fn() };
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Type-1", "Type-2"]),
        },
        commit,
      };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const input1 = wrapper.find("[data-test='Type-1']");
      await input1.setChecked();
      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", ["Type-1"]);
    });
  });

  it("navigates user to home job results page", async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Type-1", "Type-2"]),
      },
      commit,
    };
    const push = jest.fn();
    const $router = { push };

    const wrapper = mount(
      JobFiltersSidebarJobTypes,
      createConfig($store, $router)
    );

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const input1 = wrapper.find("[data-test='Type-1']");
    await input1.setChecked();

    expect(push).toHaveBeenCalledWith({ name: "JobResults" });
  });
});
