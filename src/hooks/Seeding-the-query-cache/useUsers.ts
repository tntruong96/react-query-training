import {
  QueryClient,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAllUser,
  getUserInfo,
  updateUserInfo,
} from "../../services/user.service";
import React from "react";

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

const useGetUserInfo = () => {
  const queryClient = useQueryClient();
  const [id, setId] = React.useState<string | undefined>();
  const query = useQuery({
    queryKey: ["user-info", id],
    queryFn: id ? () => getUserInfo(id) : skipToken,
    staleTime: 30 * 1000,

    // placeholderData: (previousData) => {
    //   return { username: "abds" };
    // },
    initialData: () => {
      return queryClient
        .getQueryData<{ users: [] }>(["get-users"])
        ?.users.find((user: any) => user.id === Number(id));
    },
    initialDataUpdatedAt: () =>
      // ✅ will refetch in the background if our list query data
      // is older than the provided staleTime (30 seconds)
      queryClient.getQueryState(["get-users"])?.dataUpdatedAt,
  });
  return { ...query, setId, id };
};

const useUpdateUserInformation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["user-info"],
    mutationFn: (id: string) => updateUserInfo(id),
    onSuccess(data, variables, context) {
      // console.log(mutation);
      // queryClient.setQueryData(["user-info", variables], (oldData) => {
      //   return { ...data };
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["get-users"],
      //   refetchType: "inactive",
      // });
      // return queryClient.invalidateQueries(
      //   { queryKey: ["get-users"] },
      //   { cancelRefetch: false }
      // );
    },
    meta: {
      // invalidates: [["user-info"]],
      invalidates: [],
      awaits: ["get-users"],
    },
  });
};

export { useGetAllUser, useGetUserInfo, useUpdateUserInformation };
