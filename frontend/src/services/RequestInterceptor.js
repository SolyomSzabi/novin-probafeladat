export default request => {
  const token = localStorage.getItem("auth_token");
  request.headers["Authorization"] = `Bearer ${token}`;
  return request;
};