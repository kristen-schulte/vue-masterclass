import { shallowMount } from "@vue/test-utils";
import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

import { useRouter } from "vue-router";
jest.mock("vue-router");
const useRouterMock = useRouter as jest.Mock;

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

function createConfig(props = {}) {
  return {
    props: {
      uniqueValues: new Set(["Value-A", "Value-B"]),
      mutations: "mutation",
      ...props,
    },
  };
}

describe("JobFiltersSidebarCheckboxGroup", () => {
  it("renders unique list of values for filtering jobs", async () => {
    useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });
    const wrapper = shallowMount(JobFiltersSidebarCheckboxGroup, createConfig());
    const typeLabels = wrapper.findAll("[data-test='value']");
    const types = typeLabels.map((node) => node.text());
    expect(types).toEqual(["Value-A", "Value-B"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouterMock.mockReturnValue({ push: jest.fn() });
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit, subscribe: jest.fn() });
      const props = {
        mutation: "SOME_MUTATION",
      };
      const wrapper = shallowMount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      const input1 = wrapper.find("[data-test='Value-A']");
      await input1.setValue(true);
      expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Value-A"]);
    });
  });

  it("navigates user to home job results page", async () => {
    useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });
    const push = jest.fn();
    useRouterMock.mockReturnValue({ push });
    const wrapper = shallowMount(JobFiltersSidebarCheckboxGroup, createConfig());
    const input1 = wrapper.find("[data-test='Value-A']");
    await input1.setValue(true);
    expect(push).toHaveBeenCalledWith({ name: "JobResults" });
  });
});
