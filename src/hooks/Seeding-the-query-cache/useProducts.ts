import { skipToken, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  getAllProduct,
  getProductDetail,
} from "../../services/product.service";
import { useState } from "react";

const useGetAllProduct = () => {
  const query = useSuspenseQuery({
    queryKey: ["all-product"],
    queryFn: getAllProduct,
    select(data) {
      return data.products;
    },
    // initialData: () => {
    //   return queryClient.getQueryData(["all-product"]);
    // },
  });

  return { ...query };
};

const useGetProductDetail = () => {
  const [id, setId] = useState<number | undefined>(undefined);
  const query = useQuery({
    queryKey: ["product-detail", id],
    queryFn: id ? () => getProductDetail(id) : skipToken,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
  return { ...query, setId };
};

export { useGetAllProduct, useGetProductDetail };
