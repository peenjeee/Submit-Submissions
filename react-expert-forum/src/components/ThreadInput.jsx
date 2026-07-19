import { useState } from 'react';
import PropTypes from 'prop-types';
import { z } from 'zod';

const threadSchema = z.object({
  title: z
    .string()
    .min(1, 'Judul diskusi wajib diisi')
    .max(150, 'Judul maksimal 150 karakter'),
  category: z.string().max(50, 'Kategori maksimal 50 karakter').optional(),
  body: z.string().min(1, 'Isi diskusi wajib diisi'),
});

function ThreadInput({ addThread, isMobileCollapsible = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = threadSchema.safeParse({
      title: title.trim(),
      category: category.trim(),
      body: body.trim(),
    });
    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }
    setErrors({});

    setIsSubmitting(true);
    try {
      await addThread({
        title: title.trim(),
        body: body.trim(),
        category: category.trim().toLowerCase(),
      });
      setTitle('');
      setCategory('');
      setBody('');
      setErrors({});
      if (isMobileCollapsible) {
        setIsOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isMobileCollapsible && !isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-border bg-card hover:border-foreground/30 text-left transition-all shadow-sm group cursor-pointer"
      >
        <span className="text-xs sm:text-sm font-medium text-muted-foreground truncate group-hover:text-foreground transition-colors">
          Apa yang ingin Anda diskusikan?
        </span>
        <span className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-foreground/10 text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
          Posting
        </span>
      </button>
    );
  }

  return (
    <section className="flex flex-col min-w-0 transition-all bg-card rounded-xl border border-border p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
        <h2 className="text-base font-semibold text-foreground tracking-tight">
          Buat Diskusi Baru
        </h2>
        {isMobileCollapsible && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setErrors({});
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-xs font-semibold text-foreground">
            Judul Diskusi
          </label>
          <input
            id="title"
            type="text"
            placeholder="Masukkan Judul Diskusi"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
            }}
            disabled={isSubmitting}
            className={`w-full h-10 px-3 rounded-lg border bg-background text-foreground text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
              errors.title
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border focus:ring-foreground'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 font-medium mt-0.5">{errors.title}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-xs font-semibold text-foreground">
            Kategori (Opsional)
          </label>
          <input
            id="category"
            type="text"
            placeholder="Masukkan Kategori"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (errors.category) setErrors((prev) => ({ ...prev, category: null }));
            }}
            disabled={isSubmitting}
            className={`w-full h-10 px-3 rounded-lg border bg-background text-foreground text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
              errors.category
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border focus:ring-foreground'
            }`}
          />
          {errors.category && (
            <p className="text-xs text-red-500 font-medium mt-0.5">{errors.category}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="body" className="text-xs font-semibold text-foreground">
            Isi Diskusi
          </label>
          <textarea
            id="body"
            rows="5"
            placeholder="Diskusi topik yang ingin Anda sampaikan..."
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (errors.body) setErrors((prev) => ({ ...prev, body: null }));
            }}
            disabled={isSubmitting}
            className={`w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 resize-y ${
              errors.body
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border focus:ring-foreground'
            }`}
          />
          {errors.body && (
            <p className="text-xs text-red-500 font-medium mt-0.5">{errors.body}</p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {isMobileCollapsible && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setErrors({});
              }}
              disabled={isSubmitting}
              className="h-10 px-4 rounded-lg bg-background border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-5 rounded-lg bg-foreground text-background text-sm font-medium shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Menerbitkan...' : 'Terbitkan Diskusi'}
          </button>
        </div>
      </form>
    </section>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
  isMobileCollapsible: PropTypes.bool,
};

export default ThreadInput;
