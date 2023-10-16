
import { combineReducers } from 'redux';

const initialState = {};

const selectedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_ITEMS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const anotherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANOTHER_ACTION':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
  another: anotherReducer,
  // more reducers 
});

export default rootReducer;
