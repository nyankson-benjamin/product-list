import { dataType } from "../store/store";
import ProductCard from "./ProductCard";

type ProductsProps = {
  products: dataType[]; // products is an array of dataType
};

export default function Products({ products }: Readonly<ProductsProps>) {
  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 h-[100vh] overflow-auto scrollbar-hide">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <p className="col-span-full text-center">No products available</p>
      )}
    </div>
  );
}
