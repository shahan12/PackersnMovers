import React, { useState, useRef,useEffect  } from "react";
import "../relocate/relocate.css";
import DropDown from "../dropDown/dropDown.component";
import Data from "./data.json";

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from 'react-redux';
import { updateAddress } from '../../redux/actions';

function Relocate({setLoginModal}) {
  
  const dispatch = useDispatch();
  const libraries = ['places'];
  const inputRefFrom = React.useRef();
  const inputRefTo = React.useRef();

  const [distance, setDistance] = useState(null);
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [activeTab, setActiveTab] = useState("Local");
  const [wCity, setWCity] = useState("Bengaluru");
  const [fromCity, setFromCity] = useState(activeTab === "Between City" ? "Bengaluru" : "");
  const [toCity, setToCity] = useState(activeTab === "Between City" ? "Bengaluru" : "");
  const [fromCoun, setFromCoun] = useState(activeTab === "International" ? "India" : "");
  const [toCoun, setToCoun] = useState(activeTab === "International" ? "India" : "");
  const [postData, setPostData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  
  const searchOptions = {
    componentRestrictions: { country: "IN" }, // "IN" is the country code for India
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if(activeTab === "Local" && fromAddress && toAddress) {

    }
      else if (activeTab === "Between City" && fromCity && toCity) {
        
        sessionStorage.setItem('SpLog', true);
      const requirementData = {
        'fromAddress': fromCity,
        'toAddress': toCity
      }
    } 
      else if (activeTab === "International" && fromCoun && toCoun) {
        
        sessionStorage.setItem('SpLog', true);
        const requirementData = {
          'fromAddress': fromCoun,
          'toAddress': toCoun
        }
    }
    if(sessionStorage.getItem('auth')==='false'){
      setLoginModal(true);
    }
    else{
      window.open("/fill-details", "_self");
    }
    setModalOpen(true);
  };

  useEffect(() => {
    calculateDistance();
  }, [fromAddress, toAddress]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleFromPlaceChanged = () => {
    if(!inputRefFrom?.current?.gm_accessors_?.place?.em?.formattedPrediction){
      return;
    }
    // console.log("inputRefFrom", inputRefFrom.current.gm_accessors_.place.em.formattedPrediction);
    setFromAddress(inputRefFrom?.current?.gm_accessors_?.place?.em?.formattedPrediction);
  };

  const handleToPlaceChanged = () => {
    if(!inputRefTo?.current?.gm_accessors_?.place?.em?.formattedPrediction){
      return;
    }
    // console.log("inputRefFrom", inputRefTo.current.gm_accessors_.place.em.formattedPrediction);
    setToAddress(inputRefTo?.current?.gm_accessors_?.place?.em?.formattedPrediction);
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
            sessionStorage.setItem('fromAddress',fromAddress);
            sessionStorage.setItem('toAddress',toAddress);
            sessionStorage.setItem('distance',response.rows[0].elements[0].distance.text);
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
          className={`relocate-tab ${
            activeTab === "Local" ? "active" : ""
          }`}
        >
          Local
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
      {activeTab === "Local" && (
        <div className="relocate-select-city">
          <div className="relocate-input">
            <p className="small-desc">Search From</p>
            <div className="relocate-drop-down-container">
              <DropDown
                value={wCity}
                setValue={setWCity}
                option={Data.IndianCitiesPinCode}
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
            />
          </div>
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
          
          <div className="relocate-input">
          <p className="small-desc">Source?</p>

          <div className="relocate-drop-down-container margin-bottom-40">
            <DropDown
              value={fromCoun}
              setValue={setFromCoun}
              option={Data.International}
            />
          </div>
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
        <button onClick={handleSubmit} disabled={activeTab === "Local" ? (!fromAddress || !toAddress) : ''} className="cta-button check-price">
          Check Prices
        </button>
        {/* <RegisterModal isOpen={modalOpen} onClose={closeModal} postData={postData}/> */}
      </div>
    </article>
  );
}

export default Relocate;