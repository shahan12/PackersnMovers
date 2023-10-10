import React, { useState, useContext } from "react";
import "./Modal.css";
import loginModalImg from "../../images/loginModalImg.png";
import { AppContext } from "../../context/context";
import { saveData } from "../../network/saveData";
import OTPInput from "react18-input-otp";

const RegisterModal = ({ onClose, postData, flow }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [xData, setXData] = useContext(AppContext);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [OTP, setOTP] = useState("");
  const [invalidOTP, setInvalidOTP] = useState(false);
  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;
    // Remove any non-numeric characters
    const numericValue = inputPhoneNumber.replace(/\D/g, "");
    const isValid = numericValue.length === 10;
    setPhoneNumber(numericValue);
    setIsValidPhoneNumber(isValid);
  };

  const handleSubmit = (e, flow) => {
    e.preventDefault();
    if (flow === "register") {
      // Perform login logic with the phoneNumber
      // For this example, let's just log the phone number
      const data = { ...postData, mobile: phoneNumber };
      const payload = { data };
      setXData({ data });
      // saveData(payload);
      setThankYou(true);
    } else if (flow === "login") {
      setOtpPage(true);
    }
  };

  const handleOtpInput = (value) => {
    setOTP(value);
  };

  const validateOTP = () => {
    if (OTP === "000000") {
      window.sessionStorage.setItem("loggedIn", "true");
      window.open("/fill-details", "_self");
    } else {
      setInvalidOTP(true);
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="login-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="login-modal-content">
          <div className="login-modal-image">
            {/* Replace with your image */}
            <img src={loginModalImg} alt="Login" />
          </div>
          <div className="login-modal-form">
            {flow === "register" && <h2>Let us get in touch with you!</h2>}
            {flow === "login" && <h2>Enter Number to Continue</h2>}
            {!thankYou && !otpPage && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="phoneNumber"
                  pattern="\d*"
                  maxlength="10"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter your phone number"
                  inputMode="numeric"
                />
                <button
                  type="submit"
                  onClick={(e) =>
                    handleSubmit(e, flow === "register" ? "register" : "login")
                  }
                  disabled={!isValidPhoneNumber || !phoneNumber}
                  className={`${
                    !isValidPhoneNumber || !phoneNumber ? "disabled" : ""
                  } cta-button`}
                >
                  Connect!
                </button>
              </form>
            )}
            {thankYou && flow === "register" && (
              <h3>We will connect with you shortly!</h3>
            )}
            {otpPage && flow === "login" && (
              <>
                <OTPInput
                  onChange={handleOtpInput}
                  value={OTP}
                  numInputs={6}
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
                    OTP.length < 6 ? "disabled" : ""
                  }`}
                  disabled={OTP.length < 6}
                  onClick={() => validateOTP()}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
