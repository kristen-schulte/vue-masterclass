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
            @change="selectOrganization"
          />
          <label :for="org" data-test="organization">{{ org }}</label>
        </li>
      </ul>
    </div>
  </accordion>
</template>

<script>
import { mapGetters } from "vuex";
import Accordion from "@/components/Shared/Accordion.vue";
import { UNIQUE_ORGANIZATIONS } from "@/store";
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
    selectOrganization() {
      // submit to store
    },
  },
};
</script>
