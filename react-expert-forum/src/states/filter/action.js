const ActionType = {
  SET_FILTER: 'SET_FILTER',
};

function setFilterActionCreator(category) {
  return {
    type: ActionType.SET_FILTER,
    payload: {
      category,
    },
  };
}

export {
  ActionType,
  setFilterActionCreator,
};
