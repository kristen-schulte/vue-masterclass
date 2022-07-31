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

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useFilteredJobs } from "@/store/composables";
import JobListing from "./JobListing.vue";
import { FETCH_JOBS } from "@/store/constants";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  setup() {
    const store = useStore();
    const fetchJobs = () => store.dispatch(FETCH_JOBS);
    onMounted(fetchJobs);

    const filteredJobs = useFilteredJobs();

    const route = useRoute();
    const currentPage = computed(() =>
      Number.parseInt(route.query.page || "1")
    );
    const previousPage = computed(() => {
      const previous = currentPage.value - 1;
      return previous >= 1 ? previous : undefined;
    });
    const nextPage = computed(() => {
      const next = currentPage.value + 1;
      const max = Math.ceil(filteredJobs.value.length / 10);
      return next <= max ? next : undefined;
    });

    const displayedJobs = computed(() => {
      const page = currentPage.value;
      const start = (page - 1) * 10;
      const end = 10 * page;
      return filteredJobs.value.slice(start, end);
    });

    return {
      currentPage,
      previousPage,
      nextPage,
      displayedJobs,
    };
  },
};
</script>
