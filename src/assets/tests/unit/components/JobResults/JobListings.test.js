import { ref } from "vue";
import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";
import { useFilteredJobs, useFetchJobsDispatch } from "@/store/composables";
jest.mock("@/store/composables");

import useCurrentPage from "@/composables/useCurrentPage";
jest.mock("@/composables/useCurrentPage");

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
jest.mock("@/composables/usePreviousAndNextPages");

import JobListings from "@/components/JobResults/JobListings.vue";

function createConfig() {
  return {
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  };
}

describe("JobListings", () => {
  describe("when component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue({ value: 2 });
      usePreviousAndNextPages.mockReturnValue({ previousPage: 1, nextPage: 3 });
      shallowMount(JobListings, createConfig());
      expect(useFetchJobsDispatch).toHaveBeenCalled();
    });
  });

  it("creates a job listing for a maximum of 10 jobs per page", async () => {
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPage.mockReturnValue({ value: 1 });
    usePreviousAndNextPages.mockReturnValue({
      previousPage: undefined,
      nextPage: 2,
    });
    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const listings = wrapper.findAll("[data-test='job-listing']");
    expect(listings).toHaveLength(10);
  });

  it("displays page number", () => {
    useFilteredJobs.mockReturnValue({ value: [] });
    useCurrentPage.mockReturnValue(ref(5));
    usePreviousAndNextPages.mockReturnValue({ previousPage: 4, nextPage: 6 });
    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch("Page 5");
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      const previous = wrapper.find("[data-test='previous-page-link']");
      expect(previous.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const next = wrapper.find("[data-test='next-page-link']");
      expect(next.exists()).toBe(true);
    });
  });

  describe("when the user is on the last page of job results", () => {
    it("does not show link to next page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const next = wrapper.find("[data-test='next-page-link']");
      expect(next.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previous = wrapper.find("[data-test='previous-page-link']");
      expect(previous.exists()).toBe(true);
    });
  });
});
