<template>
  <accordion header="Job Types">
    <div class="mt-5">
      <ul class="flex flex-row flex-wrap">
        <li v-for="jt in uniqueJobTypes" :key="jt" class="w-1/2 h-8">
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
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Accordion from "@/components/Shared/Accordion.vue";
import { useUniqueJobTypes } from "@/store/composables";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";
export default {
  name: "JobFiltersSidebarJobTypes",
  components: {
    Accordion,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedJobTypes = ref([]);
    const uniqueJobTypes = useUniqueJobTypes();

    const selectJobType = () => {
      store.commit(ADD_SELECTED_JOB_TYPES, selectedJobTypes.value);
      router.push({ name: "JobResults" });
    };

    return {
      selectedJobTypes,
      uniqueJobTypes,
      selectJobType,
    };
  },
};
</script>
