import PropTypes from 'prop-types';
import Avatar from './ui/Avatar';
import VoteButtons from './VoteButtons';
import { formatDate } from '../utils';

function CommentItem({
  comment,
  authUser,
  onVoteComment,
}) {
  const {
    id,
    content,
    createdAt,
    owner,
    upVotesBy = [],
    downVotesBy = [],
  } = comment;

  return (
    <div className="flex flex-col gap-3 p-4 bg-card border border-border rounded-xl shadow-sm">
      <div className="flex items-center gap-2.5">
        <Avatar
          src={owner?.avatar}
          alt={owner?.name || 'User'}
          fallback={owner?.name || 'U'}
          size="sm"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">
            {owner?.name || 'Pengguna Tidak Dikenal'}
          </span>
          <span className="text-xs text-muted-foreground">{formatDate(createdAt)}</span>
        </div>
      </div>

      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
        {content}
      </p>

      <div className="pt-2 border-t border-border/50">
        <VoteButtons
          upVotes={upVotesBy}
          downVotes={downVotesBy}
          authUser={authUser}
          onUpVote={() => onVoteComment(id, 1)}
          onDownVote={() => onVoteComment(id, -1)}
        />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVoteComment: PropTypes.func.isRequired,
};

export default CommentItem;
