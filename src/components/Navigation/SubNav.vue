<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage" data-test="job-count">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="text-brand-green-1">{{ FILTER_JOBS_ORGS.length }}</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FILTER_JOBS_ORGS } from "@/store";

export default {
  name: "SubNav",
  computed: {
    ...mapGetters([FILTER_JOBS_ORGS]),
    onJobResultsPage() {
      return this.$route.name === "JobResults";
    },
  },
};
</script>
