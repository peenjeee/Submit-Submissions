import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_DETAIL_THREAD:
    return action.payload.detailThread;
  case ActionType.CLEAR_DETAIL_THREAD:
    return null;
  case ActionType.ADD_COMMENT:
    if (!detailThread) return detailThread;
    return {
      ...detailThread,
      comments: [action.payload.comment, ...detailThread.comments],
    };
  case ActionType.TOGGLE_VOTE_DETAIL_THREAD: {
    if (!detailThread) return detailThread;
    const upVotesBy = detailThread.upVotesBy.filter((id) => id !== action.payload.userId);
    const downVotesBy = detailThread.downVotesBy.filter((id) => id !== action.payload.userId);

    if (action.payload.voteType === 1) {
      upVotesBy.push(action.payload.userId);
    } else if (action.payload.voteType === -1) {
      downVotesBy.push(action.payload.userId);
    }

    return {
      ...detailThread,
      upVotesBy,
      downVotesBy,
    };
  }
  case ActionType.TOGGLE_VOTE_COMMENT: {
    if (!detailThread) return detailThread;
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          const upVotesBy = comment.upVotesBy.filter((id) => id !== action.payload.userId);
          const downVotesBy = comment.downVotesBy.filter((id) => id !== action.payload.userId);

          if (action.payload.voteType === 1) {
            upVotesBy.push(action.payload.userId);
          } else if (action.payload.voteType === -1) {
            downVotesBy.push(action.payload.userId);
          }

          return {
            ...comment,
            upVotesBy,
            downVotesBy,
          };
        }
        return comment;
      }),
    };
  }
  default:
    return detailThread;
  }
}

export default detailThreadReducer;
