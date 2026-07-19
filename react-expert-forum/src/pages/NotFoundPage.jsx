import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-12 text-center gap-6 max-w-md mx-auto">
      <AlertTriangle className="h-12 w-12 text-destructive shrink-0" />

      <div className="flex flex-col gap-2">
        <span className="text-6xl font-black tracking-tight text-foreground">
          404
        </span>
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.
        </p>
      </div>

      <Link to="/" className="mt-2">
        <button
          type="button"
          className="h-10 px-6 rounded-xl bg-foreground text-background text-sm font-semibold shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="h-4 w-4 shrink-0" />
          <span>Kembali ke Beranda</span>
        </button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
