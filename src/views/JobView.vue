<template>
  <div>Job Page for job {{ currentJobId }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "JobView",
  setup() {
    const route = useRoute();
    const currentJobId = computed(() => route.params.id);
    return {
      currentJobId,
    };
  },
});
</script>
