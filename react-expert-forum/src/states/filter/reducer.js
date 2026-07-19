import { ActionType } from './action';

function filterReducer(filter = '', action = {}) {
  switch (action.type) {
  case ActionType.SET_FILTER:
    return action.payload.category;
  default:
    return filter;
  }
}

export default filterReducer;
