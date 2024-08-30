import axios from "axios";

const getAllUser = async () => {
  const { data } = await axios.get("https://dummyjson.com/users");
  return data;
};

const getUserInfo = async (id?: string) => {
  const { data } = await axios.get(`https://dummyjson.com/users/${id}`);
  return data;
};
const updateUserInfo = async (id: string) => {
  const { data } = await axios.put(`https://dummyjson.com/users/${id}`, {
    username: "abcd",
  });
  return data;
};

export { getAllUser, getUserInfo, updateUserInfo };
