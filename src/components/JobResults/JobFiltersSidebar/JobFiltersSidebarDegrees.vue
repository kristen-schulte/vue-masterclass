<template>
  <accordion header="Degrees">
    <job-filters-sidebar-checkbox-group
      :unique-values="uniqueDegrees"
      :mutation="ADD_SELECTED_DEGREES"
      data-test="degrees-filter"
    />
  </accordion>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Accordion from "@/components/Shared/Accordion.vue";
import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueDegrees } from "@/store/composables";
import { ADD_SELECTED_DEGREES } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarDegrees",
  components: {
    Accordion,
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const uniqueDegrees = useUniqueDegrees();

    return {
      uniqueDegrees,
      ADD_SELECTED_DEGREES,
    };
  },
});
</script>
