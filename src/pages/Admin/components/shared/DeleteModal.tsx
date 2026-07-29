import { FaExclamationTriangle } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white border border-white/20 p-6 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <FaExclamationTriangle className="text-2xl" />
        </div>
        <h3 className="mb-2 text-lg font-extrabold text-gray-900">Confirmer la suppression</h3>
        <p className="mb-6 text-sm text-rekany-gray/60">
          Cette action est irréversible. Êtes-vous sûr ?
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-red-200/50 transition-colors hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}