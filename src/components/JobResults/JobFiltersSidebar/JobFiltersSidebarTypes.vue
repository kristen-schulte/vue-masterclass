<template>
  <accordion header="Job Types">
    <job-filters-sidebar-checkbox-group
      :unique-values="uniqueJobTypes"
      :mutation="ADD_SELECTED_JOB_TYPES"
      data-test="job-types-filter"
    />
  </accordion>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Accordion from "@/components/Shared/Accordion.vue";
import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueJobTypes } from "@/store/composables";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarTypes",
  components: {
    Accordion,
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const uniqueJobTypes = useUniqueJobTypes();

    return {
      uniqueJobTypes,
      ADD_SELECTED_JOB_TYPES,
    };
  },
});
</script>
