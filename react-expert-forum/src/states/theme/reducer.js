import { ActionType } from './action';

const initialTheme = localStorage.getItem('theme') || 'light';

function themeReducer(theme = initialTheme, action = {}) {
  switch (action.type) {
  case ActionType.SET_THEME:
    localStorage.setItem('theme', action.payload.theme);
    return action.payload.theme;
  default:
    return theme;
  }
}

export default themeReducer;
