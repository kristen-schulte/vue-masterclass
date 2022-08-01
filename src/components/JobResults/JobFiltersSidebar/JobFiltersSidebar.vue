<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <job-filters-sidebar-prompt />
      <accordion header="Skills and Qualifications">
        <job-filters-sidebar-skills />
      </accordion>
      <accordion header="Degrees">
        <job-filters-sidebar-degrees />
      </accordion>
      <accordion header="Job Types">
        <job-filters-sidebar-types />
      </accordion>
      <accordion header="Organizations">
        <job-filters-sidebar-organizations />
      </accordion>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobFiltersSidebarPrompt from "./JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarSkills from "./JobFiltersSidebarSkills.vue";
import Accordion from "@/components/Shared/Accordion.vue";
import JobFiltersSidebarDegrees from "./JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarTypes from "./JobFiltersSidebarTypes.vue";
import JobFiltersSidebarOrganizations from "./JobFiltersSidebarOrganizations.vue";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    JobFiltersSidebarPrompt,
    Accordion,
    JobFiltersSidebarSkills,
    JobFiltersSidebarDegrees,
    JobFiltersSidebarTypes,
    JobFiltersSidebarOrganizations,
  },
});
</script>
