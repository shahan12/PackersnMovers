import React, { useState, useContext } from "react";
import "./Modal.css";
import loginModalImg from "../../images/price-start.png";
import loginModalImg1 from "../../images/movers11.jpg";
import companyLogo from "../../images/SHIFTKART-LOGO.png";
import { AppContext } from "../../context/context";
import { saveData } from "../../network/saveData";
import OTPInput from "react18-input-otp";
import {
  sendLoginRequestToBackend,
  sendRegisterRequestToBackend,
  sendOTPRequestToBackend,
  sendOTPVerifyRequestToBackend
} from "../../API/apicalls";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ onClose, postData, flow }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [xData, setXData] = useContext(AppContext);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [OTP, setOTP] = useState("");
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [isUserRegisterd, setIsUserRegisterd] = useState(true);
  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;
    // Remove any non-numeric characters
    const numericValue = inputPhoneNumber.replace(/\D/g, "");
    const isValid = numericValue.length === 10;
    setPhoneNumber(numericValue);
    setIsValidPhoneNumber(isValid);
  };

  const handleSubmit = (flow) => {
    console.log("calling handle submit")
    // e.preventDefault();
    const loginData = {
      userMobile: phoneNumber,
      password: OTP,
    };
    sessionStorage.setItem("phoneNumber", phoneNumber);
    if (flow === "register") {
      // Perform login logic with the phoneNumber
      // For this example, let's just log the phone number
      const data = { ...postData, mobile: phoneNumber };
      const payload = { data };
      setXData({ data });
      // saveData(payload);
      setThankYou(true);
      if (phoneNumber.length > 0 && OTP.length > 0)
        sendRegisterRequest(loginData);
    } else if (flow === "login") {
      // setOtpPage(true);
      if (phoneNumber.length > 0 && OTP.length > 0) sendLoginRequest(loginData);
    }
  };

  const sendLoginRequest = async (loginData) => {
    // const API_Req_Data_JSON = JSON.stringify(loginData);
    try {
      console.log("sending : ", loginData);
      const response = await sendLoginRequestToBackend(loginData);
      console.log(response);
      if (response === "Login Sucessfull...") {
        window.sessionStorage.setItem("loggedIn", "true");
        // navigate("/fill-details");
        window.open("/fill-details", "_self");
      }
      if (response === "Mismatched data...") {
        alert(response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendRegisterRequest = async (API_Req_Data) => {
    const API_Req_Data_JSON = JSON.stringify(API_Req_Data);
    try {
      const response = await sendRegisterRequestToBackend(API_Req_Data_JSON);
      window.open("/fill-details", "_self");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOtpInput = (e) => {
    // console.log(e);
    setOTP(e);
    // setOTP(e.target.value);
  };

  const validateOTP = () => {
    // if (OTP === "000000") {
    // window.sessionStorage.setItem("loggedIn", "true");
    // window.open("/fill-details", "_self");
    // } else {
    // setInvalidOTP(true);
    // }
  };

  const sendOTP=async(e)=>{
    e.preventDefault();
    setOtpPage(true);
    console.log("send otp to this mobile number :", phoneNumber);
    const resp=await sendOTPRequestToBackend(phoneNumber);
    if(resp.type==='success'){
      console.log(resp);
    }
    else console.log("failllled :",resp);
  }
  const verifyOTP=async()=>{
    console.log("otp typed : ", OTP);
    const resp=await sendOTPVerifyRequestToBackend({OTP, phoneNumber});
    console.log(resp);
    if(resp.type==='error'){
      alert(resp.message);
    }
    else console.log(resp);
    handleSubmit("login");
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
                  // onClick={(e) => handleSubmit(e, flow === "register" ? "register" : "login")}
                  onClick={(e) => sendOTP(e)}
                  disabled={!isValidPhoneNumber || !phoneNumber}
                  className={`${
                    !isValidPhoneNumber || !phoneNumber ? "disabled" : ""
                  } cta-button`}
                >
                  Connect!
                </button>
              </form>
            )}
            </div>
            {thankYou && flow === "register" && (
              <h3>We will connect with you shortly!</h3>
            )}
            {otpPage && flow === "login" && (
              <>
                {/* {isUserRegisterd ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="passowrd"
                      id="phoneNumber"
                      pattern="\d*"
                      maxLength="10"
                      value={OTP}
                      onChange={handleOtpInput}
                      placeholder="Enter password"
                      onClick={() => setInvalidOTP(false)}
                    />
                    <button
                      type="submit"
                      disabled={OTP.length < 6}
                      onClick={(e) =>
                        handleSubmit(
                          e,
                          flow === "register" ? "register" : "login"
                        )
                      }
                      className={`${
                        !isValidPhoneNumber || !phoneNumber ? "disabled" : ""
                      } cta-button`}
                    >
                      Submit OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="passowrd"
                      id="phoneNumber"
                      pattern="\d*"
                      maxLength="10"
                      value={OTP}
                      onChange={handleOtpInput}
                      placeholder="Enter New Password"
                      onClick={() => setInvalidOTP(false)}
                    />
                    <button
                      type="submit"
                      disabled={OTP.length < 6}
                      onClick={() => validateOTP()}
                      className={`${
                        !isValidPhoneNumber || !phoneNumber ? "disabled" : ""
                      } cta-button`}
                    >
                      Submit OTP
                    </button>
                  </form>
                )} */}

                <OTPInput
                  onChange={handleOtpInput}
                  value={OTP}
                  numInputs={4}
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
            <p className="small-desc" style={{color: '#FDFDFDC9', marginBottom: '1rem'}}>By continuing, you agree to our <span style={{textDecoration: 'underline', color: 'white'}}>Terms & Conditions</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
