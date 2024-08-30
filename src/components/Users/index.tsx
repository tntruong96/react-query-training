import { Link } from "react-router-dom";
import { useGetAllUser } from "../../hooks/Seeding-the-query-cache/useUsers";

const Users = () => {
  const { data, isLoading } = useGetAllUser();
  // const { data: productsData } = useGetAllProduct();

  if (isLoading) return <>Loading</>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {data.map((user: any) => (
        <Link to={`/user/${user?.id}`} key={user.id}>
          {user.username}
        </Link>
      ))}
    </div>
  );
};

export default Users;
