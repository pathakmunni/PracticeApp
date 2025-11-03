// src/api/fetchHelper.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY, API_BASE_URL } from "../config";

export const apiCall = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any
) => {
  const token = await AsyncStorage.getItem("authToken");

  const config = {
    url: `${API_BASE_URL}${endpoint}`,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY, // ✅ Add API key
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  const response = await axios(config);
  return response.data;
};
