import React from 'react';

const InventoryItem = ({ item, isSelected, onItemClick }) => {
  return (
    <div
      className={`inventory-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onItemClick(item)}
    >
      {item}
    </div>
  );
};

export default InventoryItem;

//