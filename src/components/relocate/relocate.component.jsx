import React, { useState } from "react";
import "../relocate/relocate.css";
import DropDown from "../dropDown/dropDown.component";
import Data from "./data.json";
import InputLanding from '../InputLanding/InputLanding.component';
import RegisterModal from "../RegisterModal/RegisterModal.component";

function Relocate(props) {
  const [activeTab, setActiveTab] = useState("Within City");
  const [wCity, setWCity] = useState('Bangalore');
  const [fromCity, setFromCity] = useState(activeTab === "Between City" ? 'Bangalore' : '');
  const [toCity, setToCity] = useState(activeTab === "Between City" ? 'Bangalore' : '');
  const [pinCodeS, setPinCodeS] = useState('');
  const [pinCodeD, setPinCodeD] = useState('');
  const [fromCoun, setFromCoun] = useState(activeTab === "International" ? 'India' : '');
  const [toCoun, setToCoun] = useState(activeTab === "International" ? 'India' : '');
  const [postData, setPostData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);


  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostData({ activeTab, wCity, fromCity, toCity, pinCodeS, pinCodeD, fromCoun, toCoun});
    setModalOpen(true);
  };

  return (
    <article className="relocate-wrapper">
      <div className="flex relocate-tabs-container">
        <button
          onClick={() => setActiveTab("Within City")}
          className={`relocate-tab ${
            activeTab === "Within City" ? "active" : ""
          }`}
        >
          Within City
        </button>
        <button
          onClick={() => setActiveTab("Between City")}
          className={`relocate-tab ${
            activeTab === "Between City" ? "active" : ""
          }`}
        >
          Between City
        </button>
        <button
          onClick={() => setActiveTab("International")}
          className={`relocate-tab ${
            activeTab === "International" ? "active" : ""
          }`}
        >
          International
        </button>
      </div>
      {activeTab === "Within City" && (
        <div className="relocate-select-city">
          <div className="relocate-input margin-bottom-40">
            <p className="small-desc">Select City</p>
            <div className="relocate-drop-down-container">
              <DropDown
                value={wCity}
                setValue={setWCity}
                option={Data.IndianCitiesPinCode}
              />
            </div>
          </div>
          <div className="relocate-search-locality">
            <p className="small-desc">Enter Pincode</p>
            <div className="relocate-input margin-bottom-40">
              <InputLanding
                selectedCity={wCity}
                pinCode={pinCodeS}
                setPinCode={setPinCodeS}
                option={Data.IndianCitiesPinCode}
              ></InputLanding>
            </div>
            <div className="relocate-input">
              <InputLanding
                selectedCity={wCity}
                pinCode={pinCodeD}
                setPinCode={setPinCodeD}
                option={Data.IndianCitiesPinCode}
              ></InputLanding>
            </div>
          </div>
        </div>
      )}
      {activeTab === "Between City" && (
        <div className="relocate-select-city">
          <p className="small-desc">Which city you want to move from?</p>
          
          <div className="relocate-drop-down-container margin-bottom-40">
            <DropDown
              value={fromCity}
              setValue={setFromCity}
              option={Data.IndianCitiesPinCode}
            />
          </div>
          <p className="small-desc">Destination city</p>
          <div className="relocate-drop-down-container">
            <DropDown
              value={toCity}
              setValue={setToCity}
              option={Data.IndianCitiesPinCode}
              />
          </div>
        </div>
      )}
      {activeTab === "International" && (
        <div className="relocate-select-city">
          <p className="small-desc">Source?</p>
          
          <div className="relocate-drop-down-container margin-bottom-40">
            <DropDown
              value={fromCoun}
              setValue={setFromCoun}
              option={Data.International}
            />
          </div>
          <p className="small-desc">Destination Country</p>
          <div className="relocate-drop-down-container">
            <DropDown
              value={toCoun}
              setValue={setToCoun}
              option={Data.International}
            />
          </div>
        </div>
      )}

      <div className="cta-container">
        <button onClick={handleSubmit} className="cta-button check-price">Check Prices</button>
        <RegisterModal isOpen={modalOpen} onClose={closeModal} postData={postData}/>
      </div>
    </article>
  );
}

export default Relocate;
