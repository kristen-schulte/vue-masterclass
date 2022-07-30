import { mount } from "@vue/test-utils";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
jest.mock("vuex");
jest.mock("vue-router");

import SubNav from "@/components/Navigation/SubNav";

function createConfig() {
  return {
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  };
}

describe("SubNav", () => {
  describe("when user is on job page", () => {
    it("displays job count", () => {
      useRoute.mockReturnValue({
        name: "JobResults",
      });
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }, { id: 2 }],
        },
      });
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("does not display job count", () => {
      useRoute.mockReturnValue({ name: "Home" });
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
