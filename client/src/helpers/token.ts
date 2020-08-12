/** @format */
export const setAccessToken = (s: string) => {
  localStorage.setItem("token", s);
};

export const getAccessToken = () => {
  return localStorage.getItem("token");
};
