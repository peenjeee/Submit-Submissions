import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { toast } from '../../utils/toast';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThread(threadId, voteType) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      toast.info('Anda harus login untuk mem-vote thread!');
      return;
    }

    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const oldVoteType = thread.upVotesBy.includes(authUser.id)
      ? 1
      : thread.downVotesBy.includes(authUser.id)
        ? -1
        : 0;

    dispatch(toggleVoteThreadActionCreator({
      threadId,
      userId: authUser.id,
      voteType,
    }));

    try {
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralizeVoteThread(threadId);
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleVoteThreadActionCreator({
        threadId,
        userId: authUser.id,
        voteType: oldVoteType,
      }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread,
};
