<template>
  <section>
    <h3>Build for everyone</h3>
    <h2>Find your next job at Brand.</h2>
  </section>
</template>

<script>
export default {
  name: "HeadlineComponent",
  data() {
    return {
      sample: "Hello",
    };
  },
  created() {
    console.log("created", this.sample);
  },
};
</script>
