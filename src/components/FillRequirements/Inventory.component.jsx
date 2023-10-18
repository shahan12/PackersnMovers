import React, { useState } from "react";
import InventoryItem from "./InventoryItem.component";
import FURNITURE from "../DATA/FinalCFT.json";
import minus from "../../images/minus.png";
import plus from "../../images/plus.png";
import itembox from "../../images/itembox.png";
import Uparrow from "../../images/upArrowinventory.png";
import downarrow from "../../images/downArrowinventory.png";
import "./Inventory.css";
import { useDispatch } from "react-redux";
import { updateSelectedItems } from "../../redux/actions";

const Inventory = ({ progress, setProgress }) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(0);
  const [inventoryData, setInventoryData] = useState(FURNITURE);
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedMaterialMap, setSelectedMaterialMap] = useState({});
  const [selectedTypeMap, setSelectedTypeMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(inventoryData)[0]
  );
  const handleItemClick = (item) => {
    setExpandedItem(item);
  };

  const FlatrequireMents = () => {
    if (progress === "inventory") {
      setProgress("dateselection");
    }
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

  const handlePlusClick = (name, typeMap, materialMap, category, subItem) => {
    if (!typeMap & !materialMap) {
      return;
    }

    const count = selectedItems[category][subItem][name].count;
    selectedItems[category][subItem][name].count = count + 1;
    setSelectedItems({ ...selectedItems });
    dispatch(updateSelectedItems(selectedItems));
  };
  // const handlePlusClick = (name, typeMap, materialMap, category, subItem) => {
  //   if (!typeMap || !materialMap) {
  //     return;
  //   }

  //   setSelectedItems((prevSelectedItems) => {
  //     const updatedSelectedItems = { ...prevSelectedItems };

  //     if (!updatedSelectedItems[category]) {
  //       updatedSelectedItems[category] = {};
  //     }
  //     if (!updatedSelectedItems[category][subItem]) {
  //       updatedSelectedItems[category][subItem] = {};
  //     }
  //     if (!updatedSelectedItems[category][subItem][name]) {
  //       updatedSelectedItems[category][subItem][name] = {};
  //       updatedSelectedItems[category][subItem][name].type = typeMap;
  //       updatedSelectedItems[category][subItem][name].material = materialMap;
  //       updatedSelectedItems[category][subItem][name].count = 1;
  //     } else {
  //       const count = updatedSelectedItems[category][subItem][name].count || 0;
  //       updatedSelectedItems[category][subItem][name].count = count + 1;
  //     }

  //     dispatch(updateSelectedItems(updatedSelectedItems));

  //     return updatedSelectedItems;
  //   });
  // };

  const handleTypeChange = (name, category, subItem, type, material) => {
    setSelectedTypeMap((prevTypeMap) => ({
      ...prevTypeMap,
      [name]: type,
    }));
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
    updatedItems[category][subItem][name].material =
      selectedMaterialMap[name] ||
      Object.keys(inventoryData[category][subItem][name].material)[0];
    updatedItems[category][subItem][name].cost = calculateCost(
      name,
      category,
      subItem,
      type,
      updatedItems[category][subItem][name].material
    );
    updatedItems[category][subItem][name].count =
      updatedItems[category][subItem][name].count || 0;

    setSelectedItems(updatedItems);
  };

  const handleMaterialChange = (name, category, subItem, material, type) => {
    setSelectedMaterialMap((prevMaterialMap) => ({
      ...prevMaterialMap,
      [name]: material,
    }));
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
    updatedItems[category][subItem][name].type =
      selectedTypeMap[name] ||
      Object.keys(inventoryData[category][subItem][name].type)[0];
    updatedItems[category][subItem][name].cost = calculateCost(
      name,
      category,
      subItem,
      type,
      updatedItems[category][subItem][name].material
    );
    updatedItems[category][subItem][name].count =
      updatedItems[category][subItem][name].count || 0;

    setSelectedItems(updatedItems);
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
      const currentCount =
        updatedSelectedItems[category]?.[subItem]?.[name]?.count || 0;
      if (currentCount > 0) {
        if (!updatedSelectedItems[category]) {
          updatedSelectedItems[category] = {};
        }
        if (!updatedSelectedItems[category][subItem]) {
          updatedSelectedItems[category][subItem] = {};
        }
        if (!updatedSelectedItems[category][subItem][name]) {
          updatedSelectedItems[category][subItem][name] = {};
        }
        updatedSelectedItems[category][subItem][name].count = currentCount - 1;
      }
      dispatch(updateSelectedItems(selectedItems));
      return updatedSelectedItems;
    });
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
              onChange={(e) =>
                handleMaterialChange(
                  name,
                  category,
                  subItem,
                  e.target.value,
                  selectedTypeMap[name] || Object.keys(data[name]?.type)[0]
                )
              }
              value={
                selectedMaterialMap[name] ||
                selectedMaterialMap[Object.keys(data[name]?.material)[0]]
              } // Set the initial value to the first material option
            >
              <option value="">Select Attribute</option>
              {Object.keys(data[name].material).map(
                (material, materialIndex) => (
                  <option key={materialIndex} value={material}>
                    {material}
                  </option>
                )
              )}
            </select>
            <select
              className="custom-select"
              onChange={(e) =>
                handleTypeChange(
                  name,
                  category,
                  subItem,
                  e.target.value,
                  selectedMaterialMap[name] ||
                    Object.keys(data[name]?.material)[0]
                )
              }
              value={
                selectedTypeMap[name] ||
                selectedTypeMap[Object.keys(data[name]?.type)[0]]
              }
            >
              <option value="">Select Type</option>
              {Object.keys(data[name].type).map((type, typeIndex) => (
                <option key={typeIndex} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="itemDetails-child">
              <div className="itemDetails-child-inc">
                <img
                  src={minus}
                  onClick={() => handleMinusClick(name, category, subItem)}
                />
                <span>
                  {selectedItems[category]?.[subItem]?.[name]?.count || 0}
                </span>
                <button
                  onClick={() =>
                    handlePlusClick(
                      name,
                      selectedTypeMap[name],
                      selectedMaterialMap[name],
                      category,
                      subItem
                    )
                  }
                  disabled={
                    !selectedTypeMap[name] ||
                    !selectedMaterialMap[name] ||
                    !selectedItems[category]?.[subItem]?.[name]?.count < 0 // Modify the disabled condition
                  }
                >
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
        {itemCount}
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
        <button className="cta-button" onClick={FlatrequireMents}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Inventory;
