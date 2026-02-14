interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast" part="toast">
        {message}
      </div>
    </div>
  );
}
