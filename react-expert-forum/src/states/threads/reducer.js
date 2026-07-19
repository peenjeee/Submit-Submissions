import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.TOGGLE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const upVotesBy = thread.upVotesBy.filter((id) => id !== action.payload.userId);
        const downVotesBy = thread.downVotesBy.filter((id) => id !== action.payload.userId);

        if (action.payload.voteType === 1) {
          upVotesBy.push(action.payload.userId);
        } else if (action.payload.voteType === -1) {
          downVotesBy.push(action.payload.userId);
        }

        return {
          ...thread,
          upVotesBy,
          downVotesBy,
        };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;
