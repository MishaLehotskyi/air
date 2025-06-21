'use client';
import ReactDOM from 'react-dom';
import {XMarkIcon} from "@heroicons/react/24/outline";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  if (typeof window === 'undefined') return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full p-6 rounded-lg relative shadow-xl min-w-[300px] max-w-[90vw] relative">
        <div className={"mb-[16px] flex flex-row justify-between items-center"}>
          <div className={"text-[rgb(73,66,82)] text-[20px] leading-[28px] font-bold"}>Payment confirmation</div>
          <div onClick={() => onClose()}
               className={"absolute top-[15px] right-[15px] h-[36px] w-[36px] rounded-[8px] bg-[#f3dbe6] cursor-pointer flex items-center justify-center transition duration-[0.3s] hover:bg-[#e1d8eb]"}>
            <XMarkIcon className="w-5 h-5 text-[rgb(242,28,181)]"/>
          </div>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
}