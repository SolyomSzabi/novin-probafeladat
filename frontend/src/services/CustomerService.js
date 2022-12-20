import axios from "axios";

const client = axios.create({
  baseURL : "http://localhost:8081/api"
});

const getCustomers = () => {
  console.log("GET Request");
  return client.get("/customers");
}

const deleteCustomer = customer => {
  return client.delete(`customers/${customer.customerID}`)
}

export {getCustomers,deleteCustomer}