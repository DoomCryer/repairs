export const formatMoney = numberIn => {
  const n = parseFloat(numberIn);

  if (Number.isNaN(n)) return "";

  const replacer = (c, i, a) =>
    i && c !== "." && (a.length - i) % 3 === 0 ? ` ${c}` : c;

  return n.toFixed(2).replace(/./g, replacer);
};
