import { useEffect } from "react";
import { useStore } from "./store/store";
import Products from "./components/Products";
import Cart from "./components/Cart";

export default function App() {
  const { data, getData, loading } = useStore();

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="flex justify-center flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-3">
          <div>
            <p className="font-extrabold text-3xl py-3">Groceries</p>
            <Products products={data} />
          </div>
          <Cart />
        </div>
      )}
    </>
  );
}
