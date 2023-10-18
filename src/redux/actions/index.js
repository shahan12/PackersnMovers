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