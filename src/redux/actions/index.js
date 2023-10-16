export const updateSelectedItems = (items) => {
    return {
      type: 'UPDATE_SELECTED_ITEMS',
      payload: items,
    };
  };
  
  export const anotherAction = (data) => {
    return {
      type: 'ANOTHER_ACTION',
      payload: data,
    };
  };