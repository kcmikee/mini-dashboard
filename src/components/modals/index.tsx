import { X } from "lucide-react";

interface TProps {
  children: React.ReactNode;
  onClose: () => void;
}
const Modal = ({ children, onClose }: TProps) => (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-xl shadow-2xl max-w-md w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      {children}
    </div>
  </div>
);
export default Modal;
