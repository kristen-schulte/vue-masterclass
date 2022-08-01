<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear filters"
        type="secondary"
        @click="clearFilters"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import ActionButton from "@/components/Shared/ActionButton.vue";
import { CLEAR_FILTERS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarPrompt",
  components: {
    ActionButton,
  },
  setup() {
    const store = useStore(key);
    const clearFilters = () => store.commit(CLEAR_FILTERS);

    return { clearFilters };
  },
});
</script>
