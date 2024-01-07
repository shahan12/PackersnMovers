import React, { useState, useContext } from "react";
import "./Modal.css";
import loginModalImg from "../../images/price-start.png";
import loginModalImg1 from "../../images/movers11.jpg";
import companyLogo from "../../images/SHIFTKART-LOGO.png";
import { useDispatch } from 'react-redux';
import { updateVars } from '../../redux/actions';
import OTPInput from "react18-input-otp";
import {
  sendLoginRequestToBackend,
  sendOTPRequestToBackend,
  sendOTPVerifyRequestToBackend
} from "../../API/apicalls";
import { performLogout } from "../FillRequirements/Requirement.component";
import { Link } from 'react-router-dom';

const authmiddleware = require('../../authmiddleware');

const RegisterModal = ({ onClose, postData, flow }) => {
  
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [OTP, setOTP] = useState("");
  const [invalidOTP, setInvalidOTP] = useState(false);
  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const numericValue = inputPhoneNumber.replace(/\D/g, "");
    const isValid = numericValue.length === 10;
    setPhoneNumber(numericValue);
    setIsValidPhoneNumber(isValid);
  };

  const handleLogin = async () => {
    try {
      const savedToken = sessionStorage.getItem('token');
      sessionStorage.setItem('loggedIn',savedToken);
      // console.log(savedToken, "savedToken");
      const response = await sendLoginRequestToBackend(phoneNumber);
      // console.log(response, "handleLogin response");
      
      if(savedToken) {

        if(response?.type==='invalidToken') {
          alert("Token Invalid, please refresh your page and try again");
          performLogout();
        }
        else if(response?.type==='serverError') {
          alert("Server Error!");
          performLogout();
        } else if (response?.type==='success' && sessionStorage.getItem('SpLog')) {
          // console.log('success', response);
          
          alert("Thank you one of our agents will get back to You!");
          performLogout();
        }
        else if (response?.type==='success'){
          // console.log('success', response);
          sessionStorage.setItem("orderSessionId", response.data);
          let update = {
            "orderSessionId": response.data,
          }
          dispatch(updateVars(update));
          window.open("/fill-details", "_self");
        } else {
          performLogout();
        }
        

      }
      else {
        // console.log("Logging Out!");
        performLogout();
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOtpInput = (e) => {
    // // console.log(e);
    setOTP(e);
    // setOTP(e.target.value);
  };


  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const resp = await sendOTPRequestToBackend(phoneNumber);
      // console.log("sendOTP",resp, resp.token );
      if (resp?.token) {
        sessionStorage.setItem('token', resp.token);
        let update = {
          "token": resp.token,
        }
        dispatch(updateVars(update));
        setOtpPage(true);
      } else if (resp.type === "failed") {
        alert("Server Error, Please Try later!");
        // console.log('Failed');
        performLogout();
      }
    } catch (error) {
      alert(error.message)
      console.error('Error:', error);
    }
  };


  const verifyOTP=async()=>{
    // console.log("otp typed : ", OTP);
    const resp=await sendOTPVerifyRequestToBackend({OTP, phoneNumber});
    // console.log("verifyOTP",resp );
    // console.log(resp);

    if(resp?.type==='invalidToken') {
      alert("Token Invalid, please refresh your page and try again");
      performLogout();
    }
    if(resp?.type==='serverError') {
      alert("Please refresh your page and try again!");
      performLogout();
    }
    if(resp?.type==='error') {
      alert("Invalid OTP!");
      performLogout();
    }
    else{
      const encData = authmiddleware.encryptData(phoneNumber);
      sessionStorage.setItem("identifier", encData);
      let update = {
        "identifier": encData,
      }
      dispatch(updateVars(update));
      handleLogin();
    }
  }

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="login-modal-close" onClick={onClose}   style={{ color: 'white' }}> 
          &times;
        </button>
        <div className="login-modal-content">
          <div className="login-modal-image">
            <img
              src={companyLogo}
              alt="logo"
              className="login-modal-company-logo"
            ></img>
            {/* Replace with your image */}
            <h4 style={{fontSize: '1.8rem'}}>Free Inspection Of Your Home Or Office</h4>
            <img src={loginModalImg} alt="Login" />
          </div>
          <div className="login-modal-form">
            <div className="center-div login-modal-man-wrapper">
              <img
                src={loginModalImg1}
                alt={"man-with-box"}
                className="login-modal-form-image"
              ></img>
            </div>
            <div>
            {flow === "register" && <p className="small-desc" style={{color: '#FDFDFDC9'}}> Let us get in touch with you!</p>}
            {flow === "login" && <p className="small-desc" style={{color: '#FDFDFDC9', marginBottom: '0.3rem'}}>Enter Number to Continue</p>}
            {!thankYou && !otpPage && (
              <form>
                <input
                  type="text"
                  id="phoneNumber"
                  pattern="\d*"
                  maxLength="10"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter your phone number"
                  inputMode="numeric"
                />
                <button
                  type="submit"
                  //onClick={(e) => handleSubmit(e, flow === "register" ? "register" : "login")}
                  onClick={(e) => sendOTP(e)}
                  disabled={!isValidPhoneNumber || !phoneNumber}
                  className={`${
                    !isValidPhoneNumber || !phoneNumber ? "disabled" : ""
                  } cta-button`}
                >
                  Login
                </button>
              </form>
            )}
            </div>
            {thankYou && flow === "register" && (
              <h3>We will connect with you shortly!</h3>
            )}
            {otpPage && flow === "login" && (
              <>


                <OTPInput
                  onChange={handleOtpInput}
                  value={OTP}
                  numInputs={4}
                  isInputNum={true}
                  separator={<span></span>}
                  inputStyle={{
                    width: "2.5rem",
                    height: "2.5rem",
                    padding: "0.75rem 0",
                    borderRadius: "0.5rem",
                    border: "1px solid #A2A6B8",
                  }}
                  containerStyle={{ gap: "0.375rem" }}
                /> 
                 <button
                  className={`cta-button continue-OTP-enter ${
                    OTP.length < 4 ? "disabled" : ""
                  }`}
                  disabled={OTP.length < 4}
                  onClick={verifyOTP}
                >
                  Continue
                </button>
                {invalidOTP && (
                  <span className="error-msg">
                    OTP is invalid! Please try again
                  </span>
                )}
              </>
            )}

            <p className="small-desc" style={{ color: '#FDFDFDC9', marginBottom: '1rem' }}>
              By continuing, you agree to our{' '}
              <Link onClick={onClose} to="/TAC-policy" style={{ textDecoration: 'underline', color: 'white' }}>
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
