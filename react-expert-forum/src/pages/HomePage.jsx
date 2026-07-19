import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncToggleVoteThread } from '../states/threads/action';
import { setFilterActionCreator } from '../states/filter/action';
import ThreadList from '../components/ThreadList';
import ThreadInput from '../components/ThreadInput';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const threads = useSelector((state) => state.threads || []);
  const users = useSelector((state) => state.users || []);
  const authUser = useSelector((state) => state.authUser);
  const filter = useSelector((state) => state.filter || '');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onVote = (id, voteType) => {
    dispatch(asyncToggleVoteThread(id, voteType));
  };

  const onSelectCategory = (category) => {
    dispatch(setFilterActionCreator(category));
  };

  const categories = [...new Set(threads.map((t) => t.category?.toLowerCase()).filter(Boolean))];

  const filteredThreads = filter
    ? threads.filter((t) => t.category?.toLowerCase() === filter.toLowerCase())
    : threads;

  return (
    <div className="flex flex-col gap-7 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-start">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="lg:hidden">
            {authUser ? (
              <ThreadInput addThread={onAddThread} isMobileCollapsible />
            ) : (
              <section className="bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col gap-3 text-center">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">Ingin Berpartisipasi?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Masuk atau daftar sekarang untuk membuat diskusi dan berkomentar.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <Link to="/login" className="flex-1">
                    <button type="button" className="w-full h-8 px-3 rounded-lg bg-foreground text-background text-xs font-medium shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
                      Masuk Akun
                    </button>
                  </Link>
                  <Link to="/register" className="flex-1">
                    <button type="button" className="w-full h-8 px-3 rounded-lg bg-background border border-border text-foreground text-xs font-medium shadow-sm hover:bg-muted transition-colors cursor-pointer">
                      Daftar
                    </button>
                  </Link>
                </div>
              </section>
            )}
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={filter}
            onSelectCategory={onSelectCategory}
          />

          <ThreadList
            threads={filteredThreads}
            users={users}
            authUser={authUser}
            onVote={onVote}
          />
        </div>

        <div className="hidden lg:flex flex-col gap-6 lg:sticky lg:top-8">
          {authUser ? (
            <ThreadInput addThread={onAddThread} />
          ) : (
            <section className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col gap-4 text-center">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">Ingin Berpartisipasi?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Masuk atau daftar sekarang untuk berpartisipasi di forum diskusi.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <Link to="/login" className="flex-1">
                  <button type="button" className="w-full h-9 px-4 rounded-lg bg-foreground text-background text-xs font-medium shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
                    Masuk Akun
                  </button>
                </Link>
                <Link to="/register" className="flex-1">
                  <button type="button" className="w-full h-9 px-4 rounded-lg bg-background border border-border text-foreground text-xs font-medium shadow-sm hover:bg-muted transition-colors cursor-pointer">
                    Daftar
                  </button>
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
