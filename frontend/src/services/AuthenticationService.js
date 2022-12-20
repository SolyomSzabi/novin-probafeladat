import axios from "axios";
import appendTokenToHeader from "./RequestInterceptor";

const client = axios.create({
  baseURL: "http://localhost:8081/auth"
});

const Login = user => {
  return client.post("/login", { ...user });
};

const LoggedView = () => {
  client.interceptors.request.use(appendTokenToHeader);
  return client.get("/logged-view");
};

export { Login,LoggedView };
