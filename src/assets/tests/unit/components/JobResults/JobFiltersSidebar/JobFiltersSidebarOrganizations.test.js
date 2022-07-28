import { mount } from "@vue/test-utils";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

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

describe("JobFiltersSidebarOrganizaions", () => {
  it("renders unique list of organizations for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(["Thing 1", "Thing 2"]),
      },
    };
    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig($store));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const orgLabels = wrapper.findAll("[data-test='organization']");
    const orgs = orgLabels.map((node) => node.text());
    expect(orgs).toEqual(["Thing 1", "Thing 2"]);
  });

  it("communicates that user has selected checkbox for org", async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(["Thing-1", "Thing-2"]),
      },
      commit,
    };
    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig($store));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const input1 = wrapper.find("[data-test='Thing-1']");
    await input1.setChecked();
    expect(commit).toHaveBeenCalledWith("ADD_SELECTED_ORGANIZATIONS", [
      "Thing-1",
    ]);
  });
});
