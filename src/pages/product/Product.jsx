import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../features/context/AppContext";
import ProductCard from "../Group/ui/ProductCard";

export default function Product() {
  const { slug } = useParams();
  const { request, cart } = useContext(AppContext);

  const [info, setInfo] = useState({
    slug: "",
    product: null,
    associations: []
  });

  const excludeQuery = useMemo(() => {
    if (!cart?.cartItems) return "";
    const ids = new Set(cart.cartItems.map(ci => ci.productId));
    return Array.from(ids).join(",");
  }, [cart]);

  useEffect(() => {
    const url = excludeQuery
      ? `/api/product/${slug}?excludeIds=${encodeURIComponent(excludeQuery)}`
      : `/api/product/${slug}`;
    request(url)
      .then(setInfo)
      .catch(err => console.error("Failed to fetch product:", err));
  }, [slug, excludeQuery, request]);

  if (!info.product) return <i>Немає такого товару</i>;

  return (
    <>
      <h1>Сторінка товару</h1>

      <div className="row">
        <div className="col col-5">
          <img
            className="w-100"
            src={info.product.imageUrl || "/fallback.png"}
            alt={info.product.name || "Product"}
          />
        </div>

        <div className="col col-6">
          <h2>{info.product.name}</h2>
          <p>{info.product.description}</p>
          <h3>₴ {info.product.price?.toFixed(2) ?? "0.00"}</h3>
          <button className="btn btn-success">У кошик</button>
        </div>

        <div className="col col-1">Тут може бути ваша реклама</div>
      </div>

      <h3 className="mt-4">Вас також може зацікавити</h3>
      <div className="row row-cols-6 g-2 mt-2">
        {info.associations.map(product => (
          <ProductCard product={product} key={product.id} isAssociation={true} />
        ))}
      </div>
    </>
  );
}
