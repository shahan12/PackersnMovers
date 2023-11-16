
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

const addOnsItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ADDONS_ITEMS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
// const RequirementsItemsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'UPDATE_Requirements_ITEMS':
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };
const TotalCostItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TotalCost_ITEMS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
const TotalDTReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DateTime_ITEMS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialState2 = {
  requirements: {
    familyType: 'Family',
    houseType: '',
    familyNumber: 4,
    floorNumber: '',
    fromLift: '',
    toFloor: '',
    toLift: '',
  },
};

const RequirementsItemsReducer = (state = initialState2, action) => {
  switch (action.type) {
    case 'UPDATE_Requirements_ITEMS':
      return {
        ...state,
        requirements: {
          ...state.requirements,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};


const address = {
  requirements: {
    fromAddress: '',
    toAddress: '',
    distance: 0,
  },
};

const AddressItemsReducer = (state = address, action) => {
  switch (action.type) {
    case 'UPDATE_Address_ITEMS':
      return {
        ...state,
        requirements: {
          ...state.requirements,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
  addOnsItems: addOnsItemsReducer,
  RequirementsItems: RequirementsItemsReducer,
  AddressItems: AddressItemsReducer,
  TotalCostItems: TotalCostItemsReducer,
  DateTime: TotalDTReducer
  // more reducers 
});

export default rootReducer;
