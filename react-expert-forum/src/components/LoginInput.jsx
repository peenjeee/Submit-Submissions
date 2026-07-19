import { useState } from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid (harus mengandung @ dan domain)'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
});

function LoginInput({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email: email.trim(), password });
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
      await login({ email: email.trim(), password });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col gap-5 min-w-0 transition-all">
      <div className="flex flex-col gap-1 border-b border-border pb-3">
        <h1 className="text-lg font-bold text-foreground tracking-tight">Masuk Akun</h1>
        <p className="text-xs text-muted-foreground">
          Masukkan email dan kata sandi Anda untuk mulai berdiskusi.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
            }}
            disabled={isSubmitting}
            className={`w-full h-10 px-3 rounded-lg border bg-background text-foreground text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border focus:ring-foreground'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 font-medium mt-0.5">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-semibold text-foreground">
            Kata Sandi
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              disabled={isSubmitting}
              className={`w-full h-10 pl-3 pr-10 rounded-lg border bg-background text-foreground text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border focus:ring-foreground'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 font-medium mt-0.5">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 px-4 mt-2 rounded-lg bg-foreground text-background text-sm font-medium shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </section>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
