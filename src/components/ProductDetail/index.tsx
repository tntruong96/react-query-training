import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetail } from "../../hooks/Seeding-the-query-cache/useProducts";

const ProductDetail = () => {
  //   const [searchParams] = useSearchParams();
  //   const id = searchParams.get("id");
  const { id } = useParams();

  const { data, setId } = useGetProductDetail();
  useEffect(() => {
    if (id) setId(Number(id));
  }, [id, setId]);

  return (
    <div>
      <h1>{data?.title}</h1>
      {data?.images.map((img: any) => (
        <img key={img} src={img} height={300} width={300} alt={img} />
      ))}
      <p>{data?.description}</p>
    </div>
  );
};

export default ProductDetail;
