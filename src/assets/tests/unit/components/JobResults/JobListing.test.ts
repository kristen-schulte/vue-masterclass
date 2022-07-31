import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";
import { Job } from "@/api/types";
import { createJob } from "../../store/utils";

function createConfig(job: Job) {
  return {
    props: {
      job: { ...job },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  };
}

describe("JobListing", () => {
  it("renders job title", () => {
    const wrapper = mount(
      JobListing,
      createConfig(createJob({ title: "Vue Programmer" }))
    );
    expect(wrapper.text()).toMatch("Vue Programmer");
  });

  it("renders job organization", () => {
    const wrapper = mount(
      JobListing,
      createConfig(createJob({ organization: "AirBnb" }))
    );
    expect(wrapper.text()).toMatch("AirBnb");
  });

  it("renders job locations", () => {
    const wrapper = mount(
      JobListing,
      createConfig(createJob({ locations: ["Jacksonville", "Orlando"] }))
    );
    expect(wrapper.text()).toMatch("Jacksonville");
    expect(wrapper.text()).toMatch("Orlando");
  });

  it("renders job qualifications", () => {
    const wrapper = mount(
      JobListing,
      createConfig(createJob({ minimumQualifications: ["Succeed"] }))
    );
    expect(wrapper.text()).toMatch("Succeed");
  });

  it("links to individual job page", () => {
    const wrapper = mount(JobListing, createConfig(createJob({ id: 15 })));
    const link = wrapper.findComponent(RouterLinkStub);
    expect(link.props("to")).toBe("/jobs/results/15");
  });
});
