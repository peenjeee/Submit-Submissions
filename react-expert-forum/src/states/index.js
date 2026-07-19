import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import detailThreadReducer from './detailThread/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import filterReducer from './filter/reducer';
import themeReducer from './theme/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    leaderboards: leaderboardsReducer,
    filter: filterReducer,
    theme: themeReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
