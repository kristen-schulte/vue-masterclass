<template>
  <section>
    <h3>{{ action }} for everyone</h3>
    <h2>Find your next job at Brand.</h2>
  </section>
</template>

<script>
export default {
  name: "HeadlineComponent",
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        const index = actions.indexOf(this.action);
        const nextIndex = (index + 1) % 4;
        this.action = actions[nextIndex];
      }, 3000);
    },
  },
};
</script>
