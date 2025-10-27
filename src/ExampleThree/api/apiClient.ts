import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL:"https://reqres.in/api"
// "https://mock.capgemini.com/api", // replace with test API
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const res = await api.post("/login", {
  email: "eve.holt@reqres.in",
  password: "cityslicka",
});


export default api;
