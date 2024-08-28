import React from "react";
import { useGetAllUser } from "../../hooks/Seeding-the-query-cache/useUsers";
import { useGetAllProduct } from "../../hooks/Seeding-the-query-cache/useProducts";

const Users = () => {
  const { data, isSuccess, isLoading } = useGetAllUser();
  // const { data: productsData } = useGetAllProduct();
  console.log(data);

  if (isLoading) return <>Loading</>;

  return (
    <div>
      {data.map((user: any) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
};

export default Users;
