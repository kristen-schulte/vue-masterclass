<template>
  <accordion header="Organizations">
    <div class="mt-5">
      <ul class="flex flex-row flex-wrap">
        <li v-for="org in uniqueOrgs" :key="org" class="w-1/2 h-8">
          <input
            :id="org"
            v-model="selectedOrganizations"
            :value="org"
            type="checkbox"
            class="mr-3"
            :data-test="org"
            @change="selectOrganization"
          />
          <label :for="org" data-test="organization">{{ org }}</label>
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
import { useUniqueOrgs } from "@/store/composables";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";
export default {
  name: "JobFiltersSidebarOrganizations",
  components: {
    Accordion,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedOrganizations = ref([]);
    const uniqueOrgs = useUniqueOrgs();

    const selectOrganization = () => {
      store.commit(ADD_SELECTED_ORGANIZATIONS, selectedOrganizations.value);
      router.push({ name: "JobResults" });
    };

    return {
      selectedOrganizations,
      uniqueOrgs,
      selectOrganization,
    };
  },
};
</script>
