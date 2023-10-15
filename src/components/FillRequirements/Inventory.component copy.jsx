import React, { useState } from 'react';
import InventoryItem from './InventoryItem.component';
import FURNITURE from '../DATA/FinalCFT.json';
import minus from '../../images/minus.png';
import plus from '../../images/plus.png';
import itembox from '../../images/itembox.png';
import Uparrow from '../../images/upArrowinventory.png';
import downarrow from '../../images/downArrowinventory.png';
import "./Inventory.css";

const Inventory = () => {

  const [itemCount, setItemCount] = useState(0);
  const [inventoryData, setInventoryData] = useState(FURNITURE);
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedMaterialMap, setSelectedMaterialMap] = useState({});
  const [selectedTypeMap, setSelectedTypeMap] = useState({});

  const handleItemClick = (item) => {
    setExpandedItem(item);
  };
  
  const handlePlusClick = (name, itemType, materialType, category, subItem) => {
    const base = inventoryData[category][subItem][name].base;
    const materialValue = inventoryData[category][subItem][name].material[materialType];
    const typeValue = inventoryData[category][subItem][name].type[itemType];
    const cost = base + materialValue + typeValue;
    const newItem = {
      name,
      type: itemType,
      material: materialType,
      cost,
    };
  
    console.log(newItem);
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [name]: {
        ...prevItems[name], // Keep the existing properties of the item
        ...newItem, // Add the new properties to the item
      },
    }));
  };
  
    const handleMaterialChange = (name, category, subItem, material, type) => {
      const selectedItem = { ...selectedItems[name] };
      console.log("selectedTypeMap", selectedTypeMap);
      selectedItem.material = material;
      if (selectedItem.type !== type) {
        selectedItem.type = type;
      }
      selectedItem.cost = calculateCost(name,category, subItem, selectedItem.type, material);
      setSelectedItems((prevItems) => ({
        ...prevItems,
        [name]: selectedItem,
      }));
    };
    
    const handleTypeChange = (name, category, subItem, type, material) => {
      const selectedItem = { ...selectedItems[name] };
      selectedItem.type = type;
      if (selectedItem.material !== material) {
        selectedItem.material = material;
      }
      selectedItem.cost = calculateCost(name, category, subItem, type, selectedItem.material);
      setSelectedItems((prevItems) => ({
        ...prevItems,
        [name]: selectedItem,
      }));
    };
  
    const calculateCost = (name, category, subItem, type, material) => {
      const base = inventoryData[category][subItem][name].base;
      const materialValue = inventoryData[category][subItem][name].material[material];
      const typeValue = inventoryData[category][subItem][name].type[type];
      return base + materialValue + typeValue;
    };
    console.log("selectedItems", selectedItems);
    const handleMinusClick = (name) => {
      setSelectedItems((prevSelectedItems) => {
        const updatedSelectedItems = { ...prevSelectedItems };
        delete updatedSelectedItems[name];
        return updatedSelectedItems;
      });
    };
    // const handleAddVariation = (name) => {
    //   // Create a new item name with a variation.
    //   const newItemName = `${name} (Variation 1)`;
    
    //   // Add the new item to inventory data.
    //   inventoryData[category][newItemName] = {
    //     ...inventoryData[category][name],
    //   };
    
    //   // Update the state to trigger re-render.
    //   setInventoryData({ ...inventoryData });
    // };
  

  const renderSubItems = (subItems, category) => {
    return Object.keys(subItems).map((subItem) => (
      <div className="category-content-p" onClick={() => handleItemClick(subItem)} key={subItem}>
        <div className="category-content-p-holder">
          {subItem}
          <img style={{marginRight: '0.5rem'}} src={expandedItem === subItem ? Uparrow :downarrow} />
        </div>
        {expandedItem === subItem && (
          <div>
            {renderItemDetails(subItems[subItem], subItem, category)}
          </div>
        )}
      </div>
    ));
  };

  const renderItemDetails = (data, subItem, category) => {                              // item box\
    
    return (
      <div className='itemDetails-parent'>
      {Object.keys(data).map((name, index) => (
        <div className='itemDetails' key={index}>
          <span>{name}</span>
          <select
            className='custom-select'
            onChange={(e) => handleMaterialChange(name, category, subItem, e.target.value, Object.keys(data[name].type)[0])}
            value={selectedMaterialMap[name] || selectedMaterialMap[Object.keys(data[name].material)[0]]} // Set the initial value to the first material option
          >
            <option value=''>Select Material</option>
            {Object.keys(data[name].material).map((material, materialIndex) => (
              <option key={materialIndex} value={material}>
                {material}
              </option>
            ))}
          </select>
          <select
            className='custom-select'
            onChange={(e) => handleTypeChange(name, category, subItem, e.target.value, Object.keys(data[name].material)[0])}
            value={selectedTypeMap[name] || selectedTypeMap[Object.keys(data[name].type)[0]]}
          >
            <option value=''>Select Type</option>
            {Object.keys(data[name].type).map((type, typeIndex) => (
              <option key={typeIndex} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className='itemDetails-child'>
              <div className='itemDetails-child-inc'>
                <img src={minus} onClick={() => handleMinusClick(name)} />
                <span>{selectedItems[name] ? 1 : 0}</span>
                <button
                  onClick={() =>
                    handlePlusClick(name, selectedTypeMap, selectedMaterialMap, category, subItem)
                  }
                  disabled={!selectedTypeMap || !selectedMaterialMap}
                >
                  <img src={plus} alt="Add" />
                </button>
              </div>
            </div>
        </div>
      ))}
    </div>
    );
  };
  return (
    <div className="requirements-section-1">
      <div className="border-bottom extra-margin">
        <h2>Fill Requirements</h2>
      </div>
      <div className='ItemAdded'>
        <div className='ItemAddedChild'>
          <img style={{marginRight: '0.5rem'}} src={itembox} />
          <span>Total Items Added</span>
        </div>
        {itemCount}
      </div>
      <div className='Inventory-container'>
         <span>Add Items from Inventory</span>
         <div className='inventory-selection-parent'>
          <span className='selected-inventory'>Furniture</span>
         </div>
      </div>
      <div>
      {Object.keys(inventoryData).map((category) => (
        <div key={category}>
          <div className="category-content">
            {renderSubItems(inventoryData[category], category)}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Inventory;
