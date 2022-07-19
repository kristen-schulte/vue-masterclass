import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");
import JobListings from "@/components/JobResults/JobListings.vue";

function createRoute(page = "5") {
  return {
    query: {
      page,
    },
  };
}

function createConfig($route) {
  return {
    global: {
      mocks: {
        $route,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  };
}

describe("JobListings", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
  });

  afterEach(() => {
    axios.get.mockReset();
  });

  it("fetches jobs", () => {
    shallowMount(JobListings, createConfig(createRoute()));
    expect(axios.get).toHaveBeenCalledWith("http://testapi.com/jobs");
  });

  it("creates a job listing for a maximum of 10 jobs per page", async () => {
    // intentional duplication for readability
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const wrapper = shallowMount(JobListings, createConfig(createRoute("1")));
    await flushPromises();
    const listings = wrapper.findAll("[data-test='job-listing']");
    expect(listings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page 1", () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig({ query: { page: undefined } })
      );
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const wrapper = shallowMount(JobListings, createConfig(createRoute("3")));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      const wrapper = shallowMount(JobListings, createConfig(createRoute("1")));
      const previous = wrapper.find("[data-test='previous-page-link']");
      expect(previous.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      const wrapper = shallowMount(JobListings, createConfig(createRoute("1")));
      await flushPromises();
      const next = wrapper.find("[data-test='next-page-link']");
      expect(next.exists()).toBe(true);
    });
  });

  describe("when the user is on the last page of job results", () => {
    it("does not show link to next page", async () => {
      // intentional duplication for readability
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const wrapper = shallowMount(JobListings, createConfig(createRoute("2")));
      await flushPromises();
      const next = wrapper.find("[data-test='next-page-link']");
      expect(next.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const wrapper = shallowMount(JobListings, createConfig(createRoute("2")));
      await flushPromises();
      const previous = wrapper.find("[data-test='previous-page-link']");
      expect(previous.exists()).toBe(true);
    });
  });
});
