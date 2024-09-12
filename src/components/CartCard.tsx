import remove from "../assets/images/icon-remove-item.svg";
import { useStore } from "../store/store";
type cartProp = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};
export default function CartCard({
  cart,
  quantity,
}: Readonly<{ cart: cartProp; quantity: number }>) {

    const {removeFromCart} = useStore()
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div>
        <p className="font-redHatBold font-bold">{cart.title}</p>
        <div className="flex items-center gap-3">
          <p className="font-redHat text-red-700 font-semibold">{quantity}x</p>
          <div className="flex gap-2">
            <p className="font-redHat text-red-900">@ ${cart.price}</p>
            <p className="font-redHat text-red-900 font-semibold">
              ${(cart.price * quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <button
            aria-label="Decrease quantity"
            className="rounded-full border p-1"
            onClick={()=>removeFromCart(cart.id)}
            onKeyDown={(e) => e.key === 'Enter'} // Handle keyboard interaction
          >
            <img src={remove} alt="" />
          </button>
      {/* <img src={remove} alt="" className="border rounded-full p-1 cursor-pointer" onClick={()=>removeFromCart(cart.id)} />{" "} */}
    </div>
  );
}
