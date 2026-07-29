import type { ToastType } from '@/types';
import { FaCheckCircle, FaTimes, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed right-5 top-5 z-60 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 rounded-xl px-5 py-3.5 text-white shadow-lg transition-transform duration-300 ${toast.type === 'success'
            ? 'bg-emerald-500'
            : toast.type === 'error'
              ? 'bg-red-500'
              : toast.type === 'info'
                ? 'bg-blue-500'
                : 'bg-amber-500'
            }`}
        >
          <span className="text-lg">
            {toast.type === 'success' ? <FaCheckCircle /> :
              toast.type === 'error' ? <FaTimes /> :
                toast.type === 'info' ? <FaInfoCircle /> : <FaExclamationCircle />}
          </span>
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => onRemove(toast.id)}
            className="ml-auto text-white/70 transition-colors hover:text-white"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      ))}
    </div>
  );
}