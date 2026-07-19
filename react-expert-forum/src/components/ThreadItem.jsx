import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Avatar from './ui/Avatar';
import VoteButtons from './VoteButtons';
import { formatDate, stripHtml } from '../utils';

function ThreadItem({
  thread,
  user,
  authUser,
  onVote,
}) {
  const {
    id,
    title,
    body,
    category,
    createdAt,
    upVotesBy,
    downVotesBy,
    totalComments,
  } = thread;

  const excerpt = stripHtml(body).slice(0, 160) + (body.length > 160 ? '...' : '');

  return (
    <div className="flex flex-col gap-3 p-5 bg-card border border-border rounded-xl shadow-sm hover:border-foreground/30 transition-all">
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-2.5">
          <Avatar
            src={user?.avatar}
            alt={user?.name || 'User'}
            fallback={user?.name || 'U'}
            size="md"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {user?.name || 'Pengguna Tidak Dikenal'}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(createdAt)}</span>
          </div>
        </div>

        {category && (
          <span className="px-2.5 py-1 bg-card border border-border rounded-md text-xs font-medium text-muted-foreground capitalize shrink-0">
            #{category}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Link to={`/threads/${id}`} className="group block">
          <h3 className="text-base font-bold text-foreground group-hover:underline transition-all line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-border/50">
        <VoteButtons
          upVotes={upVotesBy}
          downVotes={downVotesBy}
          authUser={authUser}
          onUpVote={() => onVote(id, 1)}
          onDownVote={() => onVote(id, -1)}
        />

        <Link
          to={`/threads/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{totalComments} Komentar</span>
        </Link>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVote: PropTypes.func.isRequired,
};

export default ThreadItem;
