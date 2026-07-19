import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut } from 'lucide-react';
import Avatar from './ui/Avatar';

function Navigation({
  authUser,
  onLogout,
  theme,
  onToggleTheme,
}) {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isThreadActive = location.pathname === '/' || location.pathname.startsWith('/threads/');
  const isLeaderboardActive = location.pathname === '/leaderboards';

  return (
    <header className="flex flex-col gap-2.5 py-2 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6 shrink-0">
          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-[-0.04em] text-foreground">
            PNJHub.id
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors ${
                isThreadActive
                  ? 'text-foreground font-semibold underline underline-offset-8 decoration-2 decoration-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Thread
            </Link>
            <Link
              to="/leaderboards"
              className={`transition-colors ${
                isLeaderboardActive
                  ? 'text-foreground font-semibold underline underline-offset-8 decoration-2 decoration-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Leaderboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {authUser ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1 rounded-full sm:rounded-xl hover:bg-muted transition-colors cursor-pointer focus:outline-none"
                aria-label="Menu Profil"
              >
                <div className="flex flex-col sm:items-end text-right hidden sm:flex px-1">
                  <span className="text-sm font-medium text-foreground max-w-[170px] truncate">
                    Halo, <strong>{authUser.name}</strong>
                  </span>
                  <span className="text-xs text-muted-foreground max-w-[170px] truncate">
                    {authUser.email}
                  </span>
                </div>
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 ring-2 ring-border/70">
                  <Avatar src={authUser.avatar} alt={authUser.name} fallback={authUser.name} size="md" />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 z-50 w-52 sm:w-56 bg-card border border-border rounded-xl shadow-lg p-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-2.5 py-2 border-b border-border mb-1 sm:hidden">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {authUser.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {authUser.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onToggleTheme();
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-foreground/15 transition-colors cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      {theme === 'dark' ? (
                        <Sun className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <Moon className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>Ganti Tema</span>
                    </span>
                    <span className="text-[11px] text-muted-foreground capitalize">
                      {theme === 'dark' ? 'Gelap' : 'Terang'}
                    </span>
                  </button>

                  <div className="h-px bg-border my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                type="button"
                onClick={onToggleTheme}
                className="p-1.5 sm:p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-full"
                aria-label="Toggle Theme"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-card border border-border rounded-md text-xs sm:text-sm font-medium text-foreground shadow-sm hover:bg-muted transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-foreground text-background rounded-md text-xs sm:text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
                >
                  Daftar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex sm:hidden items-center justify-between w-full pt-1 border-t border-border/60 text-xs sm:text-sm font-semibold">
        <Link
          to="/"
          className={`flex-1 text-center py-2 border-b-2 transition-all ${
            isThreadActive
              ? 'text-foreground border-foreground font-bold'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          Threads
        </Link>
        <div className="h-4 w-px bg-border/80 shrink-0 my-auto" />
        <Link
          to="/leaderboards"
          className={`flex-1 text-center py-2 border-b-2 transition-all ${
            isLeaderboardActive
              ? 'text-foreground border-foreground font-bold'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          Leaderboard
        </Link>
      </nav>
    </header>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};

export default Navigation;
