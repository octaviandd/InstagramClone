/** @format */

export const compare = (a, b) => {
  const timeA = a.createdAt.toUpperCase();
  const timeB = b.createdAt.toUpperCase();

  let comparison = 0;
  if (timeA > timeB) {
    comparison = -1;
  } else if (timeA < timeB) {
    comparison = 1;
  }
  return comparison;
};
