<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="uniqueOrgs"
    :mutation="ADD_SELECTED_ORGANIZATIONS"
    data-test="organizations-filter"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueOrgs } from "@/store/composables";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarOrgnanizations",
  components: {
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const uniqueOrgs = useUniqueOrgs();

    return {
      uniqueOrgs,
      ADD_SELECTED_ORGANIZATIONS,
    };
  },
});
</script>
