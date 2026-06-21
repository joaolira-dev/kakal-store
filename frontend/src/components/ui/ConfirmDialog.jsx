import Modal from './Modal';
export default function ConfirmDialog({ open, onClose, onConfirm, message = 'Tem certeza?' }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirmar ação">
      <p>{message}</p>
      <button className="btn btn-primary" onClick={onConfirm}>
        Confirmar
      </button>
    </Modal>
  );
}
