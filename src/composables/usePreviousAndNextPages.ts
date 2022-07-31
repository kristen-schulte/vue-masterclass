import { computed } from "vue";

interface SimpleRef {
  value: number;
}

const usePreviousAndNextPages =
  (currentPage: SimpleRef, maxPage: SimpleRef) => {
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
