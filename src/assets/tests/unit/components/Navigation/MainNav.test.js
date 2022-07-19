import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";
import { createStore } from "vuex";

function wrapperConfig(store) {
  return {
    global: {
      plugins: [store],
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  };
}

describe("MainNav", () => {
  it("displays the company name", () => {
    const store = createStore();
    const wrapper = shallowMount(MainNav, wrapperConfig(store));

    expect(wrapper.text()).toMatch("Brand Careers");
  });
  it("displays menu items for navigation", () => {
    const store = createStore();
    const wrapper = shallowMount(MainNav, wrapperConfig(store));
    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const texts = navigationMenuItems.map((i) => i.text());
    expect(texts).toEqual([
      "Teams",
      "Locations",
      "Life at Brand",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user sign in", () => {
      const store = createStore();
      const wrapper = shallowMount(MainNav, wrapperConfig(store));
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });

    describe("when user logs in", () => {
      it("issues call to login user", async () => {
        const store = createStore();
        const commit = jest.fn();
        store.commit = commit;
        const wrapper = shallowMount(MainNav, wrapperConfig(store));
        const loginButton = wrapper.find("[data-test='login-button']");
        await loginButton.trigger("click");
        expect(commit).toHaveBeenCalledWith("LOGIN_USER");
      });
    });
  });

  describe("when user logs in", () => {
    it("display user profile picture", () => {
      const store = createStore({
        state() {
          return { isLoggedIn: true };
        },
      });
      const wrapper = shallowMount(MainNav, wrapperConfig(store));
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    it("displays subnav with additional information", () => {
      const store = createStore({
        state() {
          return { isLoggedIn: true };
        },
      });
      const wrapper = shallowMount(MainNav, wrapperConfig(store));
      const subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
