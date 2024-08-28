import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../services/user.service";

const useGetAllUser = () => {
  // const query = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["get-users"],
  //       queryFn: getAllUser,
  //     },
  //   ],
  //   combine: (results) => {
  //     return {
  //       data: results.map((result) => result.data),
  //       pending: results.some((result) => result.isPending),
  //     };
  //   },
  // });

  const query = useQuery({
    queryKey: ["get-users"],
    queryFn: getAllUser,
    select(data) {
      return data?.users;
    },
  });

  return { ...query };
};

export { useGetAllUser };
