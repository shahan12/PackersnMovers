const initialState = {};

const selectedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECTED_ITEMS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default selectedItemsReducer;