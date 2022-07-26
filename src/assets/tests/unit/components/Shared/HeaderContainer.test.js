import { mount } from "@vue/test-utils";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  it("allows parent component to provide title content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: "<h2>Test Title</h2>",
      },
    });

    expect(wrapper.text()).toMatch("Test Title");
  });

  it("allows parent component to provide subtitle content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        subtitle: "<h3>Test subtitle</h3>",
      },
    });

    expect(wrapper.text()).toMatch("Test subtitle");
  });
});
