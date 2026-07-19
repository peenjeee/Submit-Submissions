import { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(({ id, message, type }) => {
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    });

    return () => unsubscribe();
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((t) => {
        let bgStyle = 'bg-card border-border text-foreground';
        if (t.type === 'error') bgStyle = 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400';
        if (t.type === 'success') bgStyle = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400';

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 ${bgStyle}`}
          >
            <span className="text-xs font-medium leading-normal">{t.message}</span>
            <button
              type="button"
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              className="ml-3 text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
