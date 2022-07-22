import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";
import JobListings from "@/components/JobResults/JobListings.vue";

function mockRoute(page = "5") {
  return {
    query: {
      page,
    },
  };
}

function mockStore(config = {}) {
  return {
    state: {
      jobs: Array(15).fill({}),
    },
    dispatch: jest.fn(),
    ...config,
  };
}

function createConfig($route, $store) {
  return {
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  };
}

describe("JobListings", () => {
  describe("when component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const dispatch = jest.fn();
      shallowMount(
        JobListings,
        createConfig(
          mockRoute(),
          mockStore({
            dispatch,
          })
        )
      );
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  it("creates a job listing for a maximum of 10 jobs per page", async () => {
    const wrapper = shallowMount(
      JobListings,
      createConfig(mockRoute("1"), mockStore())
    );
    await flushPromises();
    const listings = wrapper.findAll("[data-test='job-listing']");
    expect(listings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page 1", () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig({ query: { page: undefined } }, mockStore())
      );
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(mockRoute("3"), mockStore())
      );
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when the user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(mockRoute("1"), mockStore())
      );
      const previous = wrapper.find("[data-test='previous-page-link']");
      expect(previous.exists()).toBe(false);
    });
    it("shows link to next page", async () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(mockRoute("1"), mockStore())
      );
      await flushPromises();
      const next = wrapper.find("[data-test='next-page-link']");
      expect(next.exists()).toBe(true);
    });
  });

  describe("when the user is on the last page of job results", () => {
    it("does not show link to next page", async () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(mockRoute("2"), mockStore())
      );
      await flushPromises();
      const next = wrapper.find("[data-test='next-page-link']");
      expect(next.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      const wrapper = shallowMount(
        JobListings,
        createConfig(mockRoute("2"), mockStore())
      );
      await flushPromises();
      const previous = wrapper.find("[data-test='previous-page-link']");
      expect(previous.exists()).toBe(true);
    });
  });
});
