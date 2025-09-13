import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

console.log(api)
export default api;