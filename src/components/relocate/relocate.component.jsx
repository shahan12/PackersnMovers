import React, { useState, useRef,useEffect  } from "react";
import "../relocate/relocate.css";
import DropDown from "../dropDown/dropDown.component";
import Data from "./data.json";
import InputLanding from "../InputLanding/InputLanding.component";
import RegisterModal from "../RegisterModal/RegisterModal.component";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from 'react-redux';
import { updateAddress } from '../../redux/actions';

function Relocate(props) {
  
  const dispatch = useDispatch();
  const libraries = ['places'];
  const inputRefFrom = React.useRef();
  const inputRefTo = React.useRef();

  const [distance, setDistance] = useState(null);
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [activeTab, setActiveTab] = useState("Within City");
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

  const handleSubmit = (e) => {

    e.preventDefault();

    if(activeTab === "Within City" && fromAddress && toAddress) {
      const requirementData = {
        'fromAddress': fromAddress,
        'toAddress': toAddress,
        'distance': distance,
      }
      dispatch(updateAddress(requirementData));
    }
      else if (activeTab === "Between City" && fromCity && toCity) {
      const requirementData = {
        'fromAddress': fromCity,
        'toAddress': toCity
      }
    } 
      else if (activeTab === "International" && fromCoun && toCoun) {
        const requirementData = {
          'fromAddress': fromCoun,
          'toAddress': toCoun
        }
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
    const [place] = inputRefFrom.current.getPlaces();
    if (place) {
      setFromAddress(place.formatted_address);
    }
  };

  const handleToPlaceChanged = () => {
    const [place] = inputRefTo.current.getPlaces();
    if (place) {
      setToAddress(place.formatted_address);
    }
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
          } else {
            setDistance(null); // Unable to calculate distance
          }
        }
      );
    }
  }
  const searchOptions = {
    componentRestrictions: { locality: wCity },
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
            <p className="small-desc">Enter Addresses</p>
            <div className="relocate-input margin-bottom-40">
                  {isLoaded && (
                <StandaloneSearchBox 
                onLoad={ref => (inputRefFrom.current = ref)} 
                onPlacesChanged={handleFromPlaceChanged} 
                options={searchOptions}
                >
                  <input type="text" className="form-control" placeholder="From Address" />
                </StandaloneSearchBox>
              )}
            </div>
            <div className="relocate-input">
            {isLoaded && (
                <StandaloneSearchBox 
                onLoad={ref => (inputRefTo.current = ref)} 
                onPlacesChanged={handleToPlaceChanged} 
                options={searchOptions}
                >
                  <input type="text" className="form-control" placeholder="From Address" />
                </StandaloneSearchBox>
              )}
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
        <button onClick={handleSubmit} className="cta-button check-price">
          Check Prices
        </button>
        {/* <RegisterModal isOpen={modalOpen} onClose={closeModal} postData={postData}/> */}
      </div>
    </article>
  );
}

export default Relocate;
