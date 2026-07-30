import { FaTimes } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white border border-white/20 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-sm">
          <h3 className="text-lg font-extrabold text-gray-900">{title}</h3>
          <Button
            variant="secondary"
            onClick={onClose}
            className="p-2! rounded-xl! w-8! h-8! flex! items-center! justify-center! border-0 hover:bg-rekany-beige"
          >
            <FaTimes className="text-gray-400 hover:text-gray-600" />
          </Button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}