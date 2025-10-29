import { useState } from 'react';
import { useMedicalStore, MedicalFile } from '../store/useMedicalStore';
import { FileText, Download, Loader2 } from 'lucide-react';
import { getEncounterPDF } from '../services/medical';
import { toast } from 'react-toastify';

export default function MedicalFiles() {
  const { files } = useMedicalStore();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = async (file: MedicalFile) => {
    try {
      if (!file.patientId || !file.encounterId) {
        console.warn('Faltan IDs para descargar el archivo:', file);
        return;
      }

      setDownloadingId(file.encounterId);

      const blob = await getEncounterPDF(file.patientId, file.encounterId);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success(`Descarga completada: ${file.name}`);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      toast.error('Error al descargar el archivo');
    } finally {
      setDownloadingId(null);
    }
  };

  if (!files|| files.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500 py-8">
        No hay archivos médicos disponibles.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-accent)] p-6 transition-all duration-300 transform hover:scale-[1.03] animate-cloud">
      <h2 className="font-poppins font-semibold text-lg text-[var(--color-primary)] mb-6">
        Archivos médicos
      </h2>
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.encounterId}
            className="flex items-center space-x-4 p-4 border border-[var(--color-accent)] rounded-lg"
          >
            <FileText size={20} className="text-[var(--color-text)]" />
            <div className="flex-1">
              <div className="font-inter font-medium text-sm text-[var(--color-muted)]">
                {file.name}
              </div>
              <div className="font-inter text-xs text-[var(--color-muted)]">
                {file.type} • {file.date}
              </div>
            </div>
            <button
              type="button"
              title={`Descargar ${file.name}`}
              onClick={() => handleDownload(file)}
              disabled={downloadingId === file.encounterId}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                downloadingId === file.encounterId
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
              }`}
            >
              {downloadingId === file.encounterId ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              <span className="font-inter font-medium text-sm">
                {downloadingId === file.encounterId ? 'Descargando...' : 'Descargar'}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



