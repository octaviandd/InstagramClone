/** @format */
export const setAccessToken = (s) => {
  localStorage.setItem("token", s);
};

export const getAccessToken = () => {
  return localStorage.getItem("token");
};
