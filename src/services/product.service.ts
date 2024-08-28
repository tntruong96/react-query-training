import axios from "axios";

const getAllProduct = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data;
};

const getProductDetail = async (id?: number) => {
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
};

export { getAllProduct, getProductDetail };
