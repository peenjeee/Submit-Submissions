import PropTypes from 'prop-types';
import Avatar from './ui/Avatar';

function LeaderboardItem({ user, score, rank }) {
  return (
    <div className="flex items-center gap-3.5 p-3.5 bg-card border border-border rounded-lg shadow-sm hover:border-foreground/30 transition-colors">
      <span className="w-8 font-bold text-base text-foreground/80 flex items-center justify-center shrink-0">
        #{rank}
      </span>

      <div className="flex-1 min-w-0 flex items-center gap-3">
        <Avatar src={user.avatar} alt={user.name} fallback={user.name} size="md" />
        <div className="flex flex-col min-w-0">
          <h3 className="font-medium text-sm text-foreground truncate">{user.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="font-semibold text-sm text-foreground">{score}</span>
        <span className="text-[11px] text-muted-foreground">Skor</span>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
