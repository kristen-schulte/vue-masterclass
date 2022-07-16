const nextElementInList = (list, value) => {
  const index = list.indexOf(value);
  const nextValue = list[(index + 1) % list.length];
  return nextValue;
};

export default nextElementInList;
