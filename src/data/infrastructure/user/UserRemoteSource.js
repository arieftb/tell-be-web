import AxiosClient from "../api/AxiosClient.js";

async function getAllUsers() {
  const { data } = await AxiosClient.get("/users");
  return data.data.users;
}

async function getLeaderboards() {
  const { data } = await AxiosClient.get("/leaderboards");
  return data.data.leaderboards;
}

async function getCurrentUser() {
  const token = localStorage.getItem("accessToken");
  const { data } = await AxiosClient.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.user;
}

export { getAllUsers, getLeaderboards, getCurrentUser };
