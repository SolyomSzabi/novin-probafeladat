import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8081/api"
});

const getCustomers = () => {
  return client.get("/customers");
};

const createCustomer = customer => {
  return client.post("/customers", { ...customer });
};

const deleteCustomer = customerID => {
  return client.delete(`customers/${customerID}`);
};

export { getCustomers, deleteCustomer, createCustomer };