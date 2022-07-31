<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, onMounted, defineComponent } from "vue";
import useCurrentPage from "@/composables/useCurrentPage";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
import { useFilteredJobs, useFetchJobsDispatch } from "@/store/composables";
import JobListing from "./JobListing.vue";

export default defineComponent({
  name: "JobListings",
  components: {
    JobListing,
  },
  setup() {
    const jobsPerPage = 10;
    onMounted(useFetchJobsDispatch);
    const filteredJobs = useFilteredJobs();
    const currentPage = useCurrentPage();
    const maxPage = computed(() =>
      Math.ceil(filteredJobs.value.length / jobsPerPage)
    );
    const { previousPage, nextPage } = usePreviousAndNextPages(
      currentPage,
      maxPage
    );

    const displayedJobs = computed(() => {
      const page = currentPage.value;
      const start = (page - 1) * jobsPerPage;
      const end = jobsPerPage * page;
      return filteredJobs.value.slice(start, end);
    });

    return {
      currentPage,
      previousPage,
      nextPage,
      displayedJobs,
    };
  },
});
</script>
