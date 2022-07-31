<template>
  <accordion :header="header">
    <div class="mt-5">
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            type="checkbox"
            class="mr-3"
            :data-test="value"
            @change="selectValue"
          />
          <label :for="value" data-test="value">{{ value }}</label>
        </li>
      </ul>
    </div>
  </accordion>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { key } from "@/store";
import Accordion from "@/components/Shared/Accordion.vue";
import { CLEAR_FILTERS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarCheckboxGroup",
  components: {
    Accordion,
  },
  props: {
    header: {
      type: String,
      require: true,
      default: "Header",
    },
    uniqueValues: {
      type: [Set, Array] as PropType<Set<string> | string[]>,
      require: true,
      default: new Set([]),
    },
    mutation: {
      type: String,
      require: true,
      default: "",
    },
  },
  setup(props) {
    const store = useStore(key);
    const router = useRouter();

    const selectedValues = ref<string[]>([]);

    const selectValue = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "JobResults" });
    };

    store.subscribe((mutation) => {
      if (mutation.type === CLEAR_FILTERS) {
        selectedValues.value = [];
      }
    });

    return {
      selectedValues,
      selectValue,
    };
  },
});
</script>
