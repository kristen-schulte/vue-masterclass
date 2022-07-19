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
  it("fetches jobs", () => {
    axios.get.mockResolvedValue({ data: [] });
    shallowMount(JobListings, createConfig(createRoute()));
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("creates a job listing for a maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const wrapper = shallowMount(JobListings, createConfig(createRoute("1")));
    await flushPromises();
    const listings = wrapper.findAll("[data-test='job-listing']");
    expect(listings).toHaveLength(10);
  });
});
