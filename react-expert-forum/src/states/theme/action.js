const ActionType = {
  SET_THEME: 'SET_THEME',
};

function setThemeActionCreator(theme) {
  return {
    type: ActionType.SET_THEME,
    payload: {
      theme,
    },
  };
}

export {
  ActionType,
  setThemeActionCreator,
};
