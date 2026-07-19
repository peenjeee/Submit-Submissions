import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { toast } from '../../utils/toast';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_VOTE_DETAIL_THREAD: 'TOGGLE_VOTE_DETAIL_THREAD',
  TOGGLE_VOTE_COMMENT: 'TOGGLE_VOTE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleVoteDetailThreadActionCreator({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
    payload: {
      userId,
      voteType,
    },
  };
}

function toggleVoteCommentActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
      voteType,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ content }) {
  return async (dispatch, getState) => {
    const { detailThread } = getState();
    dispatch(showLoading());
    try {
      const comment = await api.createComment({
        threadId: detailThread.id,
        content,
      });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteDetailThread(voteType) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    if (!authUser) {
      toast.info('Anda harus login untuk mem-vote thread!');
      return;
    }

    const oldVoteType = detailThread.upVotesBy.includes(authUser.id)
      ? 1
      : detailThread.downVotesBy.includes(authUser.id)
        ? -1
        : 0;

    dispatch(toggleVoteDetailThreadActionCreator({
      userId: authUser.id,
      voteType,
    }));

    try {
      if (voteType === 1) {
        await api.upVoteThread(detailThread.id);
      } else if (voteType === -1) {
        await api.downVoteThread(detailThread.id);
      } else {
        await api.neutralizeVoteThread(detailThread.id);
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleVoteDetailThreadActionCreator({
        userId: authUser.id,
        voteType: oldVoteType,
      }));
    }
  };
}

function asyncToggleVoteComment(commentId, voteType) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    if (!authUser) {
      toast.info('Anda harus login untuk mem-vote komentar!');
      return;
    }

    const comment = detailThread.comments.find((c) => c.id === commentId);
    if (!comment) return;

    const oldVoteType = comment.upVotesBy.includes(authUser.id)
      ? 1
      : comment.downVotesBy.includes(authUser.id)
        ? -1
        : 0;

    dispatch(toggleVoteCommentActionCreator({
      commentId,
      userId: authUser.id,
      voteType,
    }));

    try {
      if (voteType === 1) {
        await api.upVoteComment({ threadId: detailThread.id, commentId });
      } else if (voteType === -1) {
        await api.downVoteComment({ threadId: detailThread.id, commentId });
      } else {
        await api.neutralizeVoteComment({ threadId: detailThread.id, commentId });
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
        voteType: oldVoteType,
      }));
    }
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  toggleVoteDetailThreadActionCreator,
  toggleVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment,
};
