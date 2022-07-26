import { mount } from "@vue/test-utils";

import Accordion from "@/components/Shared/Accordion.vue";

function createConfig(config = {}) {
  return {
    global: { stubs: { FontAwesomeIcon: true } },
    props: {
      header: "Test Header",
    },
    slots: {
      default: "Test slot content.",
    },
    ...config,
  };
}

describe("Accordion", () => {
  it("renders child", async () => {
    const testString = "Test nested child.";
    const slots = { default: `<h3>${testString}</h3>` };
    const wrapper = mount(Accordion, createConfig({ slots }));

    expect(wrapper.text()).not.toMatch(testString);

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    expect(wrapper.text()).toMatch(testString);
  });

  describe("when we do not provide custom slot content", () => {
    it("renders default content", async () => {
      const wrapper = mount(Accordion, createConfig({ slots: {} }));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      expect(wrapper.text()).toMatch("Default slot content.");
    });
  });
});
