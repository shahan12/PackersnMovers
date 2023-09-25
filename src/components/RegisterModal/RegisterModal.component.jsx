import React, { useState, useContext } from "react";
import "./Modal.css";
import loginModalImg from "../../images/loginModalImg.png";
import { AppContext } from "../../context/context";
import { saveData } from "../../network/saveData";

const RegisterModal = ({ isOpen, onClose, postData }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [xData, setXData] = useContext(AppContext);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;
    // Remove any non-numeric characters
    const numericValue = inputPhoneNumber.replace(/\D/g, "");
    const isValid = numericValue.length === 10;
    setPhoneNumber(numericValue);
    setIsValidPhoneNumber(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic with the phoneNumber
    // For this example, let's just log the phone number
    const data = { ...postData, mobile: phoneNumber };
    const payload = { data };
    setXData({ data });
    // saveData(payload);
    setThankYou(true);
  };
  if (!isOpen) return null;

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
            <h2>Let us get in touch with you!</h2>
            {!thankYou ? (
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
                  onClick={handleSubmit}
                  disabled={!isValidPhoneNumber}
                >
                  Connect!
                </button>
              </form>
            ) : (
              <h3>We will connect with you shortly!</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
