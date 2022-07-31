import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import Spotlight from "@/components/JobSearch/Spotlight.vue";

const axiosGetMock = axios.get as jest.Mock;

function axiosReturnValue() {
  return {
    data: [
      {
        img: "Some image",
        title: "Some title",
        description: "Some description",
      },
    ],
  };
}

describe("Spotlight", () => {
  it("provides img attribute to parent component", async () => {
    axiosGetMock.mockResolvedValue(axiosReturnValue());
    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="{ img, title, description }">
          <h1>{{ img }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some image");
  });
  it("provides title attribute to parent component", async () => {
    axiosGetMock.mockResolvedValue(axiosReturnValue());
    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="{ img, title, description }">
          <h1>{{ title }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some title");
  });
  it("provides description attribute to parent component", async () => {
    axiosGetMock.mockResolvedValue(axiosReturnValue());
    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="{ img, title, description }">
          <h1>{{ description }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some description");
  });
});
