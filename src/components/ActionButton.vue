<template>
  <button :class="{ primary: primary }">
    {{ text }}
  </button>

  <button :class="{ primary: primary }" @click="doubleHeight">
    {{ area }}
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: ["text"],
  data() {
    return {
      primary: true,
      width: 10,
      height: 5,
    };
  },
  computed: {
    area() {
      return this.width * this.height;
    },
  },
  methods: {
    doubleHeight() {
      this.height = this.height * 2;
    },
  },
};
</script>

<style scoped>
button {
  @apply px-5 py-3 rounded font-medium;
}
.primary {
  @apply text-white bg-brand-blue-1 hover:shadow-blue;
}
</style>
