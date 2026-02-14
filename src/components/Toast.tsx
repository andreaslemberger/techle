interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className="toast-container" role="status" aria-live="polite" aria-atomic="true">
      {message && (
        <div className="toast" part="toast">
          {message}
        </div>
      )}
    </div>
  );
}
