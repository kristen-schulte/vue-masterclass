import { mount } from "@vue/test-utils";
import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "clickable",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("clickable");
  });

  it("applies one of several styles to button", () => {
    const className = "primary";
    const wrapper = mount(ActionButton, {
      props: {
        text: "clickable",
        type: className,
      },
    });

    const button = wrapper.find("button");
    expect(button.classes(className)).toBe(true);
  });
});
