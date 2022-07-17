import { flushPromises, shallowMount } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");
import JobListings from "@/components/JobResults/JobListings.vue";

describe("JobListings", () => {
  it("fetches jobs", () => {
    axios.get.mockResolvedValue({ data: [] });
    shallowMount(JobListings);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("creates a job listing for each received job", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const wrapper = shallowMount(JobListings);
    await flushPromises();
    const listings = wrapper.findAll("[data-test='job-listing']");
    expect(listings).toHaveLength(15);
  });
});
