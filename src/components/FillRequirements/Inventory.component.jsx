import React, { useEffect, useState } from "react";
import InventoryItem from "./InventoryItem.component";
import FURNITURE from "../DATA/FinalCFT.json";
import minus from "../../images/minus.png";
import plus from "../../images/plus.png";
import itembox from "../../images/itembox.png";
import Uparrow from "../../images/upArrowinventory.png";
import downarrow from "../../images/downArrowinventory.png";
import "./Inventory.css";
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedItems } from "../../redux/actions";

const Inventory = ({ progress, setProgress, setTotalItemCount, totalItemCount, setCft }) => {

  let TotalCostItems = useSelector((state) => state.TotalCostItems);
  console.log("->>>>>>",TotalCostItems);
  const dispatch = useDispatch();
  const selectedItemsRedux = useSelector((state) => state.selectedItems);
  const [itemCount, setItemCount] = useState(0);
  const [inventoryData, setInventoryData] = useState(FURNITURE);
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(inventoryData)[0]);

  console.log("selected items", selectedItems);

  const handleItemClick = (item) => {
    setExpandedItem(item);
  };

  useEffect(() => {
    setSelectedItems(selectedItemsRedux);
  }, [setSelectedItems]);

  const handleNext = () => {
    dispatch(updateSelectedItems(selectedItems));
    setProgress('dateselection');
  };

  const handlePrevious = () => {
    dispatch(updateSelectedItems(selectedItems));
    setProgress('requirement');
  };


  const calculateTotalAndCft = () => {
    let totalCount = 0;
      let totalCft = 0;

      for (const category in selectedItems) {
          for (const subCategory in selectedItems[category]) {
              for (const item in selectedItems[category][subCategory]) {
                  const { cost, count } = selectedItems[category][subCategory][item];
                  totalCount += count;
                  totalCft += count * cost;
              }
          }
      }

    setTotalItemCount(totalCount);
    setCft(totalCft);
  };

  const handleAddVariation = (category, subItem, name) => {
    const itemToDuplicate = inventoryData[category][subItem][name];
    let variationCount = 1;
    let duplicatedName = `${name} - variation ${variationCount}`;
    while (inventoryData[category][subItem][duplicatedName]) {
      variationCount++;
      duplicatedName = `${name} - variation ${variationCount}`;
    }
    inventoryData[category][subItem][duplicatedName] = { ...itemToDuplicate };
    setInventoryData({ ...inventoryData });
  };

  const handlePlusClick = (name, category, subItem) => {
    const updatedItems = { ...selectedItems };
  
    if (!updatedItems[category]) {
      updatedItems[category] = {};
    }
    if (!updatedItems[category][subItem]) {
      updatedItems[category][subItem] = {};
    }
    if (!updatedItems[category][subItem][name]) {
      updatedItems[category][subItem][name] = {};
      const materialOptions = Object.keys(inventoryData[category][subItem][name]?.material);
      const typeOptions = Object.keys(inventoryData[category][subItem][name]?.type);
  
      updatedItems[category][subItem][name].material = materialOptions[0];
      updatedItems[category][subItem][name].type = typeOptions[0];
    }
  
    const count = updatedItems[category][subItem][name]?.count || 0;
    updatedItems[category][subItem][name] = {
      ...updatedItems[category][subItem][name],
      count: count + 1,
      cost: calculateCost(name, category, subItem, updatedItems[category][subItem][name].type, updatedItems[category][subItem][name].material),
    };
  
    // calculateTotalAndCft();
    setSelectedItems(updatedItems);
    calculateTotalAndCft();
  };
  
  
  const handleTypeChange = (name, category, subItem, type, material) => {
    const updatedItems = { ...selectedItems };
    if (!updatedItems[category]) {
      updatedItems[category] = {};
    }
    if (!updatedItems[category][subItem]) {
      updatedItems[category][subItem] = {};
    }
    if (!updatedItems[category][subItem][name]) {
      updatedItems[category][subItem][name] = {};
    }

    updatedItems[category][subItem][name].type = type;
    updatedItems[category][subItem][name].material = material;
    updatedItems[category][subItem][name].cost = calculateCost(
      name,
      category,
      subItem,
      type,
      updatedItems[category][subItem][name].material
    );
    updatedItems[category][subItem][name].count =
      updatedItems[category][subItem][name].count || 0;

      // calculateTotalAndCft();
    setSelectedItems(updatedItems);
    calculateTotalAndCft();
  };

  const handleMaterialChange = (name, category, subItem, material, type) => {
    const updatedItems = { ...selectedItems };
    if (!updatedItems[category]) {
      updatedItems[category] = {};
    }
    if (!updatedItems[category][subItem]) {
      updatedItems[category][subItem] = {};
    }
    if (!updatedItems[category][subItem][name]) {
      updatedItems[category][subItem][name] = {};
    }
    updatedItems[category][subItem][name].material = material;
    updatedItems[category][subItem][name].type = type;
    updatedItems[category][subItem][name].cost = calculateCost(
      name,
      category,
      subItem,
      type,
      updatedItems[category][subItem][name].material
    );
    updatedItems[category][subItem][name].count =
      updatedItems[category][subItem][name].count || 0;

      // calculateTotalAndCft();
      setSelectedItems(updatedItems);
      calculateTotalAndCft();
  };

  const calculateCost = (name, category, subItem, type, material) => {
    const base = inventoryData[category][subItem][name].base;
    const materialValue =
      inventoryData[category][subItem][name].material[material];
    const typeValue = inventoryData[category][subItem][name].type[type];
    return base + materialValue + typeValue;
  };

  const handleMinusClick = (name, category, subItem) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = { ...prevSelectedItems };
      const currentCount = updatedSelectedItems[category]?.[subItem]?.[name]?.count || 0;
  
      if (currentCount > 0) {
        updatedSelectedItems[category][subItem][name] = {
          ...updatedSelectedItems[category][subItem][name],
          count: currentCount - 1,
        };
      }
  
      return updatedSelectedItems;
    });
  
    calculateTotalAndCft();
  };
  
  const renderSubItems = (subItems, category) => {
    return Object.keys(subItems).map((subItem) => (
      <div
        className="category-content-p"
        onClick={() => handleItemClick(subItem)}
        key={subItem}
      >
        <div className="category-content-p-holder">
          {subItem}
          <img
            style={{ marginRight: "0.5rem" }}
            src={expandedItem === subItem ? Uparrow : downarrow}
          />
        </div>
        {expandedItem === subItem && (
          <div>{renderItemDetails(subItems[subItem], subItem, category)}</div>
        )}
      </div>
    ));
  };

  const renderItemDetails = (data, subItem, category) => {
    // item box\
    return (
      <div className="itemDetails-parent">
        {Object.keys(data).map((name, index) => (
          <div className="itemDetails" key={index}>
            <span>{name}</span>
            <select
                className="custom-select"
                onChange={(e) => handleMaterialChange(name, category, subItem, e.target.value, selectedItems[category]?.[subItem]?.[name]?.type || Object.keys(data[name]?.type)[0])}
                value={selectedItems[category]?.[subItem]?.[name]?.material || Object.keys(data[name]?.material)[0]}
              >
                {Object.keys(data[name]?.material).map((material, materialIndex) => (
                  <option key={materialIndex} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            <select
                className="custom-select"
                onChange={(e) => handleTypeChange(name, category, subItem, e.target.value, selectedItems[category]?.[subItem]?.[name]?.material || Object.keys(data[name]?.material)[0])}
                value={selectedItems[category]?.[subItem]?.[name]?.type || Object.keys(data[name]?.type)[0]}
              >
                {Object.keys(data[name]?.type).map((type, typeIndex) => (
                  <option key={typeIndex} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            <div className="itemDetails-child">
              <div className="itemDetails-child-inc">
                <button 
                  onClick={() => handleMinusClick(name, category, subItem)}>
                  <img
                    src={minus} alt="Minus"/>
                </button>
                
                <span>
                  {selectedItems[category]?.[subItem]?.[name]?.count || 0}
                </span>
                <button
                  onClick={() => handlePlusClick(name,category,subItem)}>
                  <img src={plus} alt="Add" />
                </button>
              </div>
              {name.includes("variation") ? (
                ""
              ) : (
                <span
                  onClick={() => handleAddVariation(category, subItem, name)}
                >
                  Add Variation
                </span>
              )}
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
      <div className="ItemAdded">
        <div className="ItemAddedChild">
          <img style={{ marginRight: "0.5rem" }} src={itembox} />
          <span>Total Items Added</span>
        </div>
        {totalItemCount}
      </div>
      <div className="Inventory-container">
        <span>Add Items from Inventory</span>
        <div className="inventory-selection-parent">
          {Object.keys(inventoryData).map((category) => (
            <span
              key={category}
              className={
                category === selectedCategory
                  ? "selected-inventory"
                  : "non-selected-inventory"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div key={selectedCategory}>
          <div className="category-content">
            {renderSubItems(inventoryData[selectedCategory], selectedCategory)}
          </div>
        </div>
    </div>
    
      <div className="fill-req-CTA-container flex">
        <div className='prevButton' onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handlePrevious();
          }}>&lt; Previous</div>
        <button className="cta-button" onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleNext();
          }}>NEXT</button>
      </div>
    </div>
  );
};

export default Inventory;
