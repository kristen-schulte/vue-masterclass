<template>
  <accordion header="Organizations">
    <div class="mt-5">
      <ul class="flex flex-row flex-wrap">
        <li class="w-1/2 h-8">
          <input id="VueTube" type="checkbox" class="mr-3" />
          <label for="VueTube">VueTube</label>
        </li>
        <li class="w-1/2 h-8">
          <input id="VueTube" type="checkbox" class="mr-3" />
          <label for="VueTube">VueTube</label>
        </li>
        <li class="w-1/2 h-8">
          <input id="VueTube" type="checkbox" class="mr-3" />
          <label for="VueTube">VueTube</label>
        </li>
        <li class="w-1/2 h-8">
          <input id="VueTube" type="checkbox" class="mr-3" />
          <label for="VueTube">VueTube</label>
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
};
</script>
