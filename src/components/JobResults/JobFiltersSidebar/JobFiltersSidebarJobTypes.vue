<template>
  <accordion header="Job Types">
    <div class="mt-5">
      <ul class="flex flex-row flex-wrap">
        <li v-for="jt in UNIQUE_JOB_TYPES" :key="jt" class="w-1/2 h-8">
          <input
            :id="jt"
            v-model="selectedJobTypes"
            :value="jt"
            type="checkbox"
            class="mr-3"
            :data-test="jt"
            @change="selectJobType"
          />
          <label :for="jt" data-test="job-type">{{ jt }}</label>
        </li>
      </ul>
    </div>
  </accordion>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Accordion from "@/components/Shared/Accordion.vue";
import { UNIQUE_JOB_TYPES, ADD_SELECTED_JOB_TYPES } from "@/store/constants";
export default {
  name: "JobFiltersSidebarJobTypes",
  components: {
    Accordion,
  },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapGetters([UNIQUE_JOB_TYPES]),
  },
  methods: {
    ...mapMutations([ADD_SELECTED_JOB_TYPES]),
    selectJobType() {
      this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
    },
  },
};
</script>
