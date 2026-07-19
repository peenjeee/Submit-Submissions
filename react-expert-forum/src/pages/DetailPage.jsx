import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import {
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment,
} from '../states/detailThread/action';
import Avatar from '../components/ui/Avatar';
import VoteButtons from '../components/VoteButtons';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { formatDate } from '../utils';

function DetailPage() {
  const { id } = useParams();
  const detailThread = useSelector((state) => state.detailThread);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  if (!detailThread) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
        Memuat detail diskusi...
      </div>
    );
  }

  const {
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy = [],
    downVotesBy = [],
    comments = [],
  } = detailThread;

  const onVoteDetailThread = (voteType) => {
    dispatch(asyncToggleVoteDetailThread(voteType));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ content }));
  };

  const onVoteComment = (commentId, voteType) => {
    dispatch(asyncToggleVoteComment(commentId, voteType));
  };

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto w-full">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Daftar Diskusi</span>
        </Link>
      </div>

      <section className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col gap-5 min-w-0 transition-all">
        <div className="flex justify-between items-start gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Avatar
              src={owner?.avatar}
              alt={owner?.name || 'User'}
              fallback={owner?.name || 'U'}
              size="md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {owner?.name || 'Pengguna Tidak Dikenal'}
              </span>
              <span className="text-xs text-muted-foreground">{formatDate(createdAt)}</span>
            </div>
          </div>

          {category && (
            <span className="px-2.5 py-1 bg-background border border-border rounded-md text-xs font-medium text-muted-foreground capitalize shrink-0">
              #{category}
            </span>
          )}
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight leading-snug">
          {title}
        </h1>

        <div
          className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed text-sm sm:text-base space-y-3"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <VoteButtons
            upVotes={upVotesBy}
            downVotes={downVotesBy}
            authUser={authUser}
            onUpVote={() => onVoteDetailThread(1)}
            onDownVote={() => onVoteDetailThread(-1)}
          />
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {authUser ? (
          <CommentInput addComment={onAddComment} />
        ) : (
          <section className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Masuk atau daftar untuk ikut memberikan komentar pada diskusi ini.
            </p>
            <div className="flex justify-center gap-3 pt-1">
              <Link to="/login">
                <button type="button" className="h-9 px-4 rounded-lg bg-foreground text-background text-xs font-medium shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
                  Masuk Akun
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="h-9 px-4 rounded-lg bg-background border border-border text-foreground text-xs font-medium shadow-sm hover:bg-muted transition-colors cursor-pointer">
                  Daftar
                </button>
              </Link>
            </div>
          </section>
        )}

        <CommentList
          comments={comments}
          authUser={authUser}
          onVoteComment={onVoteComment}
        />
      </div>
    </div>
  );
}

export default DetailPage;
