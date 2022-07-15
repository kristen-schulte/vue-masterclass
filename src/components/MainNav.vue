<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <a :href="url" class="flex items-center h-full text-xl">{{
          company
        }}</a>
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="item in menuItems"
              :key="item"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <a href="" class="flex items-center h-full py-2.5">{{ item }}</a>
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <profile-image
            v-if="isLoggedIn"
            data-test="profile-image"
            @click="swapUserLogin"
          />
          <action-button
            v-else
            text="Sign In"
            data-test="login-button"
            @click="swapUserLogin"
          />
        </div>
      </div>
      <div><sub-nav /></div>
    </div>
  </header>
</template>

<script>
import ActionButton from "./ActionButton.vue";
import ProfileImage from "./ProfileImage.vue";
import SubNav from "./SubNav.vue";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    SubNav,
  },
  data() {
    return {
      company: "Brand Careers",
      url: "https://careers.google.com",
      menuItems: [
        "Teams",
        "Locations",
        "Life at Brand",
        "How we hire",
        "Students",
        "Jobs",
      ],
      isLoggedIn: false,
    };
  },
  methods: {
    swapUserLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },
  },
};
</script>
