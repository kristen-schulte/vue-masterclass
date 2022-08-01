<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
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
      <job-filters-sidebar-degrees />
      <job-filters-sidebar-types />
      <job-filters-sidebar-organizations />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import ActionButton from "@/components/Shared/ActionButton.vue";
import JobFiltersSidebarDegrees from "./JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarTypes from "./JobFiltersSidebarTypes.vue";
import JobFiltersSidebarOrganizations from "./JobFiltersSidebarOrganizations.vue";
import { CLEAR_FILTERS } from "@/store/constants";
import { key } from "@/store";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    ActionButton,
    JobFiltersSidebarDegrees,
    JobFiltersSidebarTypes,
    JobFiltersSidebarOrganizations,
  },
  setup() {
    const store = useStore(key);
    const clearFilters = () => store.commit(CLEAR_FILTERS);

    return { clearFilters };
  },
});
</script>
