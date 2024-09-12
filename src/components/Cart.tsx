import { useStore } from "../store/store";
import CartCard from "./CartCard";
import empty from "../assets/images/illustration-empty-cart.svg";
import carbon from "../assets/images/icon-carbon-neutral.svg";
import Button from "./buttons/Button";
import Modal from "./Modal";
import { useState } from "react";
import CheckOutCard from "./CheckOutCard";
import confirmed from "../assets/images/icon-order-confirmed.svg"
export default function Cart() {
  const { cart, removeFromCart } = useStore();
  const [openModal, setOpenModal] = useState(false);
  let sum = 0;

  for (const element of cart) {
    sum += element?.product?.price * element?.quantity || 0; // Adding a fallback of 0 if price is undefined
  }

  const handleRemove = () => {
    setOpenModal(false)
    cart.forEach((item) => {
      removeFromCart(item.product.id);
    });
  };

  return (
    <div className="bg-white rounded-lg xs:w-full sm:w-full md:w-1/2 lg:w/2 xl:w-1/3 w-1/3 p-3 h-fit">
      <p className="font-redHatBold text-red-700 font-semibold">
        Your Cart ({cart?.length})
      </p>
      {cart.map((cart) => (
        <CartCard
          key={cart?.product.id}
          cart={cart?.product}
          quantity={cart?.quantity}
        />
      ))}
      {cart?.length > 0 && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center font-redHat text-red-900 py-3">
            <p>Order Total</p>
            <p className="font-extrabold">${sum?.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-center bg-slate-50 p-4 rounded-lg">
            <img src={carbon} alt="" />
            <p>
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>
          <Button text="Confirm Order" onClick={() => setOpenModal(true)} />
        </div>
      )}

      {cart?.length === 0 && (
        <div className="flex flex-col gap-2 items-center">
          <img src={empty} alt="" />
          <p className="font-redHatBold text-red-800">
            Your added items will appear here
          </p>
        </div>
      )}

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="">
        <img src={confirmed} alt="" />
        <p className="font-redHat font-extrabold text-xl">Order Confirmed</p>
        <p>We hope you enjoyed your food</p>
        <div className="rounded-lg  bg-[#fcf9f5] mb-5 mt-3">
          {cart.map((item, index) => (
            <CheckOutCard
              key={item?.product.id}
              cart={item?.product}
              quantity={item?.quantity}
              isLast={index === cart?.length - 1}
            />
          ))}

          <div className="flex justify-between items-center font-redHat text-red-900 p-5">
            <p>Order Total</p>
            <p className="font-extrabold">${sum?.toFixed(2)}</p>
          </div>
        </div>

        <Button text="Start New Order" onClick={() => handleRemove()} />
      </Modal>
    </div>
  );
}
