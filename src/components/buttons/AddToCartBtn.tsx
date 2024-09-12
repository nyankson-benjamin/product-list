import Add from "../../assets/images/icon-increment-quantity.svg";
import Sub from "../../assets/images/icon-decrement-quantity.svg";
import { useStore } from "../../store/store";
export default function AddToCartBtn({ productId }: Readonly<{ productId: number }>) {

    const {addToCart, getCartItem, decreaseQuantity,} = useStore()

    const itemQuantity = getCartItem(productId)?.quantity;
    const handleIncrement = () => {
        addToCart(productId);
      };
    const handleDecrement = () => {
        if (itemQuantity! > 0) {
          decreaseQuantity(productId)
          // Optionally, you can handle removing from cart or decreasing quantity here
        }
      };
    return (
        <div className="flex bg-[#8f0505] justify-between items-center gap-2 rounded-full border px-3 py-2 border-[#8f0505] w-full text-white">
          <button
            aria-label="Decrease quantity"
            className="rounded-full border p-1"
            onClick={handleDecrement}
            onKeyDown={(e) => e.key === 'Enter' && handleDecrement()} // Handle keyboard interaction
          >
            <img src={Sub} alt="" />
          </button>
          <span>{itemQuantity ?? 0} </span>
          <button
            aria-label="Increase quantity"
            className="rounded-full border p-1"
            onClick={handleIncrement}
            onKeyDown={(e) => e.key === 'Enter' && handleIncrement()} // Handle keyboard interaction
          >
            <img src={Add} alt="" />
          </button>
        </div>
      );
}
