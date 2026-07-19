import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads = [],
  users = [],
  authUser,
  onVote,
}) {
  return (
    <section className="flex flex-col min-w-0 transition-all">
      <div className="flex justify-between items-center mb-4 border-b border-border/60 pb-3">
        <h2 className="text-base font-semibold text-foreground tracking-tight">
          Daftar Diskusi Forum
        </h2>
        <span className="text-xs font-medium text-muted-foreground">
          {threads.length} diskusi
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {threads.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Belum ada diskusi untuk kategori ini.
          </div>
        ) : (
          threads.map((thread) => {
            const user = users.find((u) => u.id === thread.ownerId);
            return (
              <ThreadItem
                key={thread.id}
                thread={thread}
                user={user}
                authUser={authUser}
                onVote={onVote}
              />
            );
          })
        )}
      </div>
    </section>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVote: PropTypes.func.isRequired,
};

export default ThreadList;
