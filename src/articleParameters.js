export default function (productId, sort) {
  return {
    product: productId,
    sort: sort,
  };
}

export const sortKeys = {
  NEWEST: "new",
  OLDEST: "old",
};
