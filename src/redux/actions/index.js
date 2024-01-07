export const updateSelectedItems = (items) => {
    return {
      type: 'UPDATE_SELECTED_ITEMS',
      payload: items,
    };
  };
  
  export const updateAddOnsItems = (items) => {
    return {
      type: 'UPDATE_ADDONS_ITEMS',
      payload: items,
    };
  };

  export const updateRequirements = (items) => {
    return {
      type: 'UPDATE_Requirements_ITEMS',
      payload: items,
    };
  };  
  
  export const updateTotalCost = (items) => {
    return {
      type: 'UPDATE_TotalCost_ITEMS',
      payload: items,
    };
  };  
  export const updateDateTime = (items) => {
    return {
      type: 'UPDATE_DateTime_ITEMS',
      payload: items,
    };
  };
  export const updateAddress = (items) => {
    return {
      type: 'UPDATE_Address_ITEMS',
      payload: items,
    };
  };
  export const updateVars = (items) => {
    return {
      type: 'UPDATE_Vars',
      payload: items,
    };
  };