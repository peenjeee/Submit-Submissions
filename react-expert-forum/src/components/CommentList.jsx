import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({
  comments = [],
  authUser,
  onVoteComment,
}) {
  return (
    <section className="flex flex-col min-w-0 transition-all mt-6">
      <div className="flex justify-between items-center mb-4 border-b border-border/60 pb-3">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          Komentar Diskusi
        </h3>
        <span className="text-xs font-medium text-muted-foreground">
          {comments.length} komentar
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {comments.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Belum ada komentar untuk diskusi ini. Jadilah yang pertama memberikan balasan!
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              authUser={authUser}
              onVoteComment={onVoteComment}
            />
          ))
        )}
      </div>
    </section>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVoteComment: PropTypes.func.isRequired,
};

export default CommentList;
