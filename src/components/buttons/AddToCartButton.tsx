import image from "../../assets/images/icon-add-to-cart.svg";
export default function AddToCartButton() {
  return (
    <button className="flex items-center justify-center gap-2 rounded-full border px-3 py-2 border-[#8f0505] w-full bg-white">
      <img src={image} alt="" />
      <span className=""> Add to Cart</span>
    </button>
  );
}
