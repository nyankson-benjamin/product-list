import React from "react";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title:string
};

function Modal({ isOpen, onClose, children, title }: Readonly<ModalProps>) {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <div className="flex justify-between gap-5 items-center">
            <p className="font-redHat font-extrabold text-4xl">{title}</p>
        <button
          className=" text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
        </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
