<template>
  <section class="mb-16">
    <h1
      class="font-bold tracking-tighter text-8xl mb-14"
      data-test="action-phrase"
    >
      <span :class="actionClasses">{{ action }}</span> <br />for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Brand.</h2>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import nextElementInList from "@/utils/nextElementInList";

interface ActionClasses {
  [x: string]: boolean;
}

interface Data {
  action: string;
  interval?: number;
}

export default defineComponent({
  name: "HeadlineComponent",
  data(): Data {
    return {
      action: "Build",
    };
  },
  computed: {
    actionClasses(): ActionClasses {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
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
        this.action = nextElementInList(actions, this.action);
      }, 3000);
    },
  },
});
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}
.code {
  color: #d93025;
}
</style>
