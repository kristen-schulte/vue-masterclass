import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";

function createJobProps(jobProps = {}) {
  return {
    title: "Vue Developer",
    organization: "Meta",
    ...jobProps,
  };
}

function createConfig(job) {
  return {
    props: {
      job,
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
      createConfig(createJobProps({ title: "Vue Programmer" }))
    );
    expect(wrapper.text()).toMatch("Vue Programmer");
  });

  it("renders job organization", () => {
    const wrapper = mount(
      JobListing,
      createConfig(createJobProps({ organization: "AirBnb" }))
    );
    expect(wrapper.text()).toMatch("AirBnb");
  });
});
