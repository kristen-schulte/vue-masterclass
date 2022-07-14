import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays the company name", () => {
    const wrapper = mount(MainNav, {
      data() {
        return {
          company: "Super Corp",
        };
      },
    });
    expect(wrapper.text()).toMatch("Super Corp");
  });
});
