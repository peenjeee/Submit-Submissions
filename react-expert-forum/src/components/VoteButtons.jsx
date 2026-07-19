import PropTypes from 'prop-types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

function VoteButtons({
  upVotes = [],
  downVotes = [],
  authUser,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = authUser && upVotes.includes(authUser.id);
  const isDownVoted = authUser && downVotes.includes(authUser.id);

  return (
    <div className="inline-flex items-center gap-4">
      <button
        type="button"
        onClick={onUpVote}
        className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
          isUpVoted
            ? 'text-foreground font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Upvote"
      >
        <ThumbsUp className={`h-4 w-4 ${isUpVoted ? 'fill-current' : ''}`} />
        <span>{upVotes.length}</span>
      </button>

      <button
        type="button"
        onClick={onDownVote}
        className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
          isDownVoted
            ? 'text-foreground font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Downvote"
      >
        <ThumbsDown className={`h-4 w-4 ${isDownVoted ? 'fill-current' : ''}`} />
        <span>{downVotes.length}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  upVotes: PropTypes.arrayOf(PropTypes.string),
  downVotes: PropTypes.arrayOf(PropTypes.string),
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default VoteButtons;
