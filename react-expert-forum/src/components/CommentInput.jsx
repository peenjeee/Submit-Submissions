import { useState } from 'react';
import PropTypes from 'prop-types';
import { z } from 'zod';

const commentSchema = z.object({
  content: z.string().min(1, 'Isi komentar wajib diisi'),
});

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = commentSchema.safeParse({ content: content.trim() });
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
      await addComment(content.trim());
      setContent('');
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col min-w-0 transition-all">
      <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b border-border">
        Beri Komentar
      </h3>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <textarea
            id="comment"
            rows={3}
            placeholder="Tulis pendapat atau balasan Anda di sini..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors((prev) => ({ ...prev, content: null }));
            }}
            disabled={isSubmitting}
            className={`w-full min-h-[90px] p-3 rounded-lg border bg-background text-foreground text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
              errors.content
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border focus:ring-foreground'
            }`}
          />
          {errors.content && (
            <p className="text-xs text-red-500 font-medium mt-0.5">{errors.content}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-9 px-4 rounded-lg bg-foreground text-background text-xs font-medium shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
          </button>
        </div>
      </form>
    </section>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
