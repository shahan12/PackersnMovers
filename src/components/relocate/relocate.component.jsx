import React, { useState, useRef, useEffect } from "react";
import "../relocate/relocate.css";
import DropDown from "../dropDown/dropDown.component";
import Data from "./data.json";

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from 'react-redux';
import { updateAddress } from '../../redux/actions';

function Relocate({ setLoginModal }) {

  const dispatch = useDispatch();
  const libraries = ['places'];
  const inputRefFrom = React.useRef();
  const inputRefTo = React.useRef();

  const [distance, setDistance] = useState(null);
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [activeTab, setActiveTab] = useState("Local");
  const [fromCity, setFromCity] = useState(activeTab === "Between City" ? "Bangalore" : "Bangalore");
  const [toCity, setToCity] = useState(activeTab === "Between City" ? "Bangalore" : "Bangalore");
  const [fromCoun, setFromCoun] = useState(activeTab === "International" ? "India" : "India");
  const [toCoun, setToCoun] = useState(activeTab === "International" ? "India" : "India");
  const [modalOpen, setModalOpen] = useState(false);
  const [wCity, setWCity] = useState(Data.IndianCitiesCoordinates[0]);

  const handleCitySelect = (selectedCity) => {
    setWCity(selectedCity);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const defaultBounds = {
    north: wCity.latitude + 0.3,
    south: wCity.latitude - 0.3,
    east: wCity.longitude + 0.3,
    west: wCity.longitude - 0.3,
  };
  const searchOptions = {
    componentRestrictions: { country: "IN" },
    bounds: defaultBounds,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "Local" && fromAddress && toAddress) {

      if (sessionStorage.getItem('auth') === 'false') {
        setLoginModal(true);
      }
      else {
        window.open("/fill-details", "_self");
      }
      setModalOpen(true);
    }
    else if (activeTab === "Between City" && fromCity && toCity) {

      sessionStorage.setItem('SpLog', true);
      setLoginModal(true);
      // const requirementData = {
      //   'fromAddress': fromCity,
      //   'toAddress': toCity
      // }
    }
    else if (activeTab === "International" && fromCoun && toCoun) {

      sessionStorage.setItem('SpLog', true);
      setLoginModal(true);
      // const requirementData = {
      //   'fromAddress': fromCoun,
      //   'toAddress': toCoun
      // }
    }
  };
  useEffect(() => {
    calculateDistance();
  }, [fromAddress, toAddress]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleFromPlaceChanged = () => {
    const place = inputRefFrom?.current?.gm_accessors_?.place;
    if (!place) return;

    const firstPropertyKey = Object.keys(place)[0];
    const formattedPrediction = place[firstPropertyKey]?.formattedPrediction;
    if (!formattedPrediction) return;

    setFromAddress(formattedPrediction);
  };


  const handleToPlaceChanged = () => {
    const place = inputRefTo?.current?.gm_accessors_?.place;
    if (!place) return;

    const firstPropertyKey = Object.keys(place)[0];
    const formattedPrediction = place[firstPropertyKey]?.formattedPrediction;
    if (!formattedPrediction) return;

    setToAddress(formattedPrediction);
  };

  const calculateDistance = () => {
    if (fromAddress && toAddress) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [fromAddress],
          destinations: [toAddress],
          travelMode: 'DRIVING',
        },
        (response, status) => {

          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            setDistance(response.rows[0].elements[0].distance.text);
            sessionStorage.setItem('fromAddress', fromAddress);
            sessionStorage.setItem('toAddress', toAddress);
            sessionStorage.setItem('distance', response.rows[0].elements[0].distance.text);
            const requirementData = {
              'fromAddress': fromAddress,
              'toAddress': toAddress,
              'distance': distance,
            }
            dispatch(updateAddress(requirementData));
          } else {
            alert("Region Not Supported.");
            setDistance(null); // Unable to calculate distance
          }
        }
      );
    }
  }

  return (
    <article className="relocate-wrapper">
      <div className="flex relocate-tabs-container">
        <button
          onClick={() => setActiveTab("Local")}
          className={`relocate-tab ${activeTab === "Local" ? "active" : ""
            }`}
        >
          Local
        </button>
        <button
          onClick={() => setActiveTab("Between City")}
          className={`relocate-tab ${activeTab === "Between City" ? "active" : ""
            }`}
        >
          Between City
        </button>
        <button
          onClick={() => setActiveTab("International")}
          className={`relocate-tab ${activeTab === "International" ? "active" : ""
            }`}
        >
          International
        </button>
      </div>
      {activeTab === "Local" && (
        <div className="relocate-select-city">
          <div className="relocate-input">
            <p className="small-desc">Select City</p>
            <div className="relocate-drop-down-container">
              <DropDown
                value={wCity.name}
                setValue={setWCity}
                option={Data.IndianCitiesCoordinates}
                onSelect={handleCitySelect}
              />

            </div>
          </div>
          <div className="relocate-search-locality">
            <p className="small-desc">Search From</p>
            <div className="relocate-input">
              {isLoaded && (
                <Autocomplete
                  onLoad={ref => (inputRefFrom.current = ref)}
                  onPlaceChanged={handleFromPlaceChanged}
                  options={searchOptions}
                >
                  <input type="text" className="relocate-input-box" placeholder="From Address" />
                </Autocomplete>
              )}
            </div>
            <div className="relocate-input">
              <p className="small-desc">Search To</p>
              {isLoaded && (
                <Autocomplete
                  onLoad={ref => (inputRefTo.current = ref)}
                  onPlaceChanged={handleToPlaceChanged}
                  options={searchOptions}
                >
                  <input type="text" className="relocate-input-box" placeholder="To Address" />
                </Autocomplete>
              )}
            </div>



          </div>
        </div>
      )}


      {activeTab === "Between City" && (
        <div className="relocate-select-city">

          <div className="relocate-input">
            <p className="small-desc">Which city you want to move from?</p>
            <div className="relocate-drop-down-container margin-bottom-40">
              <DropDown
                value={fromCity}
                setValue={setFromCity}
                option={Data.IndianCitiesPinCode}
                onSelect={handleCitySelect}
              />
            </div>
          </div>
          <p className="small-desc">Destination city</p>
          <div className="relocate-drop-down-container">
            <DropDown
              value={toCity}
              setValue={setToCity}
              option={Data.IndianCitiesPinCode}
              onSelect={handleCitySelect}
            />
          </div>
        </div>
      )}
      {activeTab === "International" && (
        <div className="relocate-select-city">

          <div className="relocate-input">
            <p className="small-desc">Source?</p>

            <div className="relocate-drop-down-container margin-bottom-40">
              <DropDown
                value={fromCoun}
                setValue={setFromCoun}
                option={Data.International}
                onSelect={handleCitySelect}
              />
            </div>
          </div>
          <p className="small-desc">Destination Country</p>
          <div className="relocate-drop-down-container">
            <DropDown
              value={toCoun}
              setValue={setToCoun}
              option={Data.International}
              onSelect={handleCitySelect}
            />
          </div>
        </div>
      )}

      <div className="cta-container">
        <button onClick={handleSubmit} disabled={activeTab === "Local" ? (!fromAddress || !toAddress) : ''} className="cta-button check-price">
          Check Prices
        </button>
        {/* <RegisterModal isOpen={modalOpen} onClose={closeModal} postData={postData}/> */}
      </div>
    </article>
  );
}

export default Relocate;