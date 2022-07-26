<template>
  <accordion header="Organizations">
    <div class="mt-5">
      <ul class="flex flex-row flex-wrap">
        <li v-for="org in UNIQUE_ORGANIZATIONS" :key="org" class="w-1/2 h-8">
          <input :id="org" type="checkbox" class="mr-3" />
          <label :for="org">{{ org }}</label>
        </li>
      </ul>
    </div>
  </accordion>
</template>

<script>
import Accordion from "@/components/Shared/Accordion.vue";
export default {
  name: "JobFiltersSidebarOrganizations",
  components: {
    Accordion,
  },
  computed: {
    UNIQUE_ORGANIZATIONS() {
      return this.$store.getters.UNIQUE_ORGANIZATIONS;
    },
  },
};
</script>
