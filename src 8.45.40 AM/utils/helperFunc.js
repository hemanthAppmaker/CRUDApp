export const selectColor = number => {
  const hue = number * 137.508; // use golden angle approximation
  return `hsl(${hue},50%,75%)`;
};
