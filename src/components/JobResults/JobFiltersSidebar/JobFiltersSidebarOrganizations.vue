<template>
  <accordion header="Organizations">
    <div class="mt-5">
      <ul class="flex flex-row flex-wrap">
        <li v-for="org in UNIQUE_ORGANIZATIONS" :key="org" class="w-1/2 h-8">
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
import { mapGetters, mapMutations } from "vuex";
import Accordion from "@/components/Shared/Accordion.vue";
import {
  UNIQUE_ORGANIZATIONS,
  ADD_SELECTED_ORGANIZATIONS,
} from "@/store/constants";
export default {
  name: "JobFiltersSidebarOrganizations",
  components: {
    Accordion,
  },
  data() {
    return {
      selectedOrganizations: [],
    };
  },
  computed: {
    ...mapGetters([UNIQUE_ORGANIZATIONS]),
  },
  methods: {
    ...mapMutations([ADD_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
    },
  },
};
</script>
