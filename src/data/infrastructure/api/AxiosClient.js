import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "https://forum-api.dicoding.dev/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosClient;
