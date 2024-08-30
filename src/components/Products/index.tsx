import { Link } from "react-router-dom";
import {
  useGetAllProduct,
  useGetProductDetail,
} from "../../hooks/Seeding-the-query-cache/useProducts";
// const productQuery = { queryKey: ["prefetch-product"], queryFn: getAllProduct };
// const queryClient = new QueryClient();
// queryClient.prefetchQuery(productQuery);

const Product = () => {
  const { data } = useGetAllProduct();
  const { setId } = useGetProductDetail();

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
