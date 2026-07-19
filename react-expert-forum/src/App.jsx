import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBarPackage from 'react-redux-loading-bar';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { setThemeActionCreator } from './states/theme/action';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ToastContainer from './components/ui/ToastContainer';
import BackToTop from './components/ui/BackToTop';

const LoadingBar = typeof LoadingBarPackage === 'function'
  ? LoadingBarPackage
  : LoadingBarPackage.default || LoadingBarPackage.LoadingBar || LoadingBarPackage;

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const theme = useSelector((state) => state.theme || 'light');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const onToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setThemeActionCreator(nextTheme));
  };

  if (isPreload) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <LoadingBar style={{ backgroundColor: theme === 'dark' ? '#38bdf8' : '#000000', height: '4px', position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />
        <ToastContainer />
        <div className="flex flex-col items-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm font-medium text-muted-foreground">Memuat aplikasi...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200 font-sans">
      <LoadingBar style={{ backgroundColor: theme === 'dark' ? '#38bdf8' : '#000000', height: '4px', position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />
      <ToastContainer />
      <BackToTop />

      <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-3.5 sm:py-6 md:py-8 flex flex-col gap-4 sm:gap-7 flex-1">
        <Navigation
          authUser={authUser}
          onLogout={onLogout}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <main className="flex-1 flex flex-col gap-7">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="py-6 text-center text-xs text-muted-foreground mt-4 border-t border-border/60">
          <p>© {new Date().getFullYear()} PNJHub.id</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
