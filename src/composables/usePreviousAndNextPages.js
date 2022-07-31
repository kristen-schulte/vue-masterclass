import { computed } from "vue";

const usePreviousAndNextPages = (currentPage, maxPage) => {
  const previousPage = computed(() => {
    const previous = currentPage.value - 1;
    return previous >= 1 ? previous : undefined;
  });
  const nextPage = computed(() => {
    const next = currentPage.value + 1;
    return next <= maxPage.value ? next : undefined;
  });

  return { previousPage, nextPage };
};

export default usePreviousAndNextPages;
