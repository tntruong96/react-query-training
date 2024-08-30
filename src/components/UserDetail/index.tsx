import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllUser,
  useGetUserInfo,
  useUpdateUserInformation,
} from "../../hooks/Seeding-the-query-cache/useUsers";
import { useGetAllProduct } from "../../hooks/Seeding-the-query-cache/useProducts";

const UserDetail = () => {
  const { id } = useParams();
  const { data, setId, isLoading, id: userId } = useGetUserInfo();
  const { mutate } = useUpdateUserInformation();
  const { data: user, isLoading: loading } = useGetAllUser();
  const { data: product } = useGetAllProduct();

  React.useEffect(() => {
    setId(id);
  }, [id, setId]);

  const update = () => {
    if (userId) mutate(userId);
  };

  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <button onClick={update}>update</button>
      <h1>{data?.username}</h1>
      <img src={data?.image} alt={data?.username} />
      <ul>
        <li>{data?.birthDate}</li>
        <li>{data?.phone}</li>
        <li>{data?.email}</li>
      </ul>
    </div>
  );
};

export default UserDetail;
