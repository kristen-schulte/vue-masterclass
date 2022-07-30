import { mount } from "@vue/test-utils";
import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useUniqueOrgs } from "@/store/composables";
jest.mock("@/store/composables");

import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

function createConfig() {
  return {
    global: {
      stubs: { FontAwesomeIcon: true },
    },
  };
}

describe("JobFiltersSidebarOrganizaions", () => {
  it("renders unique list of organizations for filtering jobs", async () => {
    useUniqueOrgs.mockReturnValue(new Set(["Thing-1", "Thing-2"]));
    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const orgLabels = wrapper.findAll("[data-test='organization']");
    const orgs = orgLabels.map((node) => node.text());
    expect(orgs).toEqual(["Thing-1", "Thing-2"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for org", async () => {
      useRouter.mockReturnValue({ push: jest.fn() });
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useUniqueOrgs.mockReturnValue(new Set(["Thing-1", "Thing-2"]));
      const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const input1 = wrapper.find("[data-test='Thing-1']");
      await input1.setChecked();
      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_ORGANIZATIONS", [
        "Thing-1",
      ]);
    });

    it("navigates user to home job results page", async () => {
      useUniqueOrgs.mockReturnValue(new Set(["Thing-1", "Thing-2"]));
      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const input1 = wrapper.find("[data-test='Thing-1']");
      await input1.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
