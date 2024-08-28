import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getAllProduct } from "../../services/product.service";
import {
  useGetAllProduct,
  useGetProductDetail,
} from "../../hooks/Seeding-the-query-cache/useProducts";
import { Link } from "react-router-dom";
// const productQuery = { queryKey: ["prefetch-product"], queryFn: getAllProduct };
// const queryClient = new QueryClient();
// queryClient.prefetchQuery(productQuery);

const Product = () => {
  const { data } = useGetAllProduct();
  const { data: dataDetail, setId } = useGetProductDetail();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {data.map((product: any) => (
        <Link
          onMouseEnter={() => setId(product?.id)}
          style={{
            height: 100,
          }}
          to={`/product/${product.id}`}
        >
          {product.title}
        </Link>
      ))}
    </div>
  );
};

export default Product;
