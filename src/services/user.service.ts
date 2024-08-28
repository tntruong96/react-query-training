import axios from "axios";

const getAllUser = async () => {
  const { data } = await axios.get("https://dummyjson.com/users");
  return data;
};

export { getAllUser };
