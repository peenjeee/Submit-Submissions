import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards = [] }) {
  return (
    <section className="flex flex-col min-w-0 transition-all">
      <div className="flex justify-between items-center mb-4 border-b border-border/60 pb-3">
        <h2 className="text-base font-semibold text-foreground tracking-tight">
          Klasemen Pengguna Aktif
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {leaderboards.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Belum ada data leaderboard yang tersedia.
          </div>
        ) : (
          leaderboards.map((item, index) => (
            <LeaderboardItem
              key={item.user.id}
              user={item.user}
              score={item.score}
              rank={index + 1}
            />
          ))
        )}
      </div>
    </section>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default LeaderboardList;
