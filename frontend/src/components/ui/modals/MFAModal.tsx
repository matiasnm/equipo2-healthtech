import { useMFA } from "../../../hooks/useMFA";
import { toast } from "react-toastify";
import type { User } from "../../../types/User.types"; 

type MFAModalProps = {
  userId: string;
  tempToken?: string;
  onClose: () => void;
  onSuccess?: (token: string, user: User) => void; 
};

const MFAModal = ({ userId, tempToken, onClose, onSuccess }: MFAModalProps) => {
  const { code, setCode, loading, validateCode } = useMFA();

  const handleConfirm = () => {
    if (!tempToken) {
      toast.error("El tiempo ha expirado. Volvé a iniciar sesión.");
      onClose();
      return;
    }
    validateCode(userId, tempToken, onClose, onSuccess);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Validación MFA</h2>
        <p className="mb-2 text-sm text-gray-600">
          Ingresá el código enviado a tu email
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de 6 dígitos"
          className="border p-2 w-full rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Validando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MFAModal;



