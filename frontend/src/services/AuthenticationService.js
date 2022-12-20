import axios from "axios";
// import appendTokenToHeader from "./RequestInterceptor";

const client = axios.create({
  baseURL: "http://localhost:8081/auth"
});

const Login = user => {
  return client.post("/login", { ...user });
};

// const LoggedInView = () => {
//   client.interceptors.request.use(appendTokenToHeader);
//   return client.get("/admin-view");
// };

export { Login };
