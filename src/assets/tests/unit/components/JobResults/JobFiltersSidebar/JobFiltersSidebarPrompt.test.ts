import { mount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");

const useStoreMock = useStore as jest.Mock;

import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";

describe("JobFiltersSidebarPrompt", () => {
  describe("when user clicks clear filters button", () => {
    it("sends message to clear filters", () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit });
      const wrapper = mount(JobFiltersSidebarPrompt);
      const button = wrapper.find("[data-test='clear-filters']");
      button.trigger("click");
      expect(commit).toHaveBeenCalledWith("CLEAR_FILTERS");
    })
  })
})