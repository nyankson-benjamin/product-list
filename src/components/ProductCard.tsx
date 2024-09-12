import { useState } from "react";
import { dataType } from "../store/store";
import AddToCartButton from "./buttons/AddToCartButton";
import AddToCartBtn from "./buttons/AddToCartBtn";

type ProductsProps = {
  product: dataType; // products is an array of dataType
};
export default function ProductCard({ product }: Readonly<ProductsProps>) {
  const [id, setId] = useState(0);
  return (
    <div className="w-full">
      <div
        className="flex flex-col items-center"
        onMouseOver={() => setId(product.id)}
        onMouseLeave={() => setId(0)}
      >
        <img
          src={product.thumbnail}
          alt=""
          className={["w-full rounded-lg border bg-slate-200", id === product.id ? "border-red-700" :""].join(" ")}
        />
        <div className="-mt-5 mb-5 w-[70%] font-redHatBold text-[#2b0404]">
          {id === product.id ? <AddToCartBtn productId={product.id}/> : <AddToCartButton/>}
        </div>
      </div>
      <p>{product.category}</p>
      <p className="font-redHatBold font-semibold text-red-900">
        {product.title}
      </p>
      <p className="font-redHat text-red-700 font-bold">${product.price}</p>
    </div>
  );
}
