type cartProp = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};
export default function CheckOutCard({
  cart,
  quantity,
  isLast,
}: Readonly<{ cart: cartProp; quantity: number; isLast: boolean }>) {
  return (
    <div
      className={[
        "flex items-center justify-between p-3  ",
        isLast ? "" : "border-b",
      ].join("")}
    >
      <div className="flex items-center">
        <img src={cart.thumbnail} alt="" className="w-10" />
        <div>
          <p className="font-redHatBold font-bold">{cart.title}</p>
          <div className="flex items-center justify-between gap-3">
            <p className="font-redHat text-red-700 font-semibold">
              {quantity}x
            </p>
            <div className="flex gap-2">
              <p className="font-redHat text-red-900">@ ${cart.price}</p>
            </div>
          </div>
        </div>
      </div>
            <p className="font-redHat text-red-900 font-semibold">
              ${cart.price * quantity}
            </p>
    </div>
  );
}
