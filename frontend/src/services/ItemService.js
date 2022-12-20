import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8081/api"
});

const createItem = item => {
  return client.post("/items", { ...item });
};

const deleteItem = ID => {
  return client.delete(`items/${ID}`);
};

export { createItem, deleteItem };