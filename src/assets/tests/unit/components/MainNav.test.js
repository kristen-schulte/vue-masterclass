import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays the company name", () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("Brand Careers");
  });
  it("displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
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
});

describe("when user is logged out", () => {
  it("prompts user sign in", () => {
    const wrapper = mount(MainNav, {
      data() {
        return { isLoggedIn: false };
      },
    });

    const loginButton = wrapper.find("[data-test='login-button']");
    const profileImage = wrapper.find("[data-test='profile-image']");
    expect(loginButton.exists()).toBe(true);
    expect(profileImage.exists()).toBe(false);
  });
});

describe("when user logs in", () => {
  it("display user profile picture", () => {
    const wrapper = mount(MainNav, {
      data() {
        return { isLoggedIn: true };
      },
    });

    const loginButton = wrapper.find("[data-test='login-button']");
    const profileImage = wrapper.find("[data-test='profile-image']");
    expect(loginButton.exists()).toBe(false);
    expect(profileImage.exists()).toBe(true);
  });
});
