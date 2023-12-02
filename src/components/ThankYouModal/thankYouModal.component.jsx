import React from "react";
import ComapnyLogo from "../../images/SHIFTKART-LOGO.png";
import "./thankyouModal.css";

function ThankYouModal({ isModalOpen, setIsModalOpen }) {
  return (
    <div className="login-modal-overlay">
      <div className="thankyou-modal-container">
        <div className="modal-upper-section space-between">
          <div className="flex modal-company-logo">
            <img
              src={ComapnyLogo}
              alt="logo-shiftkart"
              className="flex width-100"
            ></img>
          </div>
          <button
            className="modal-close-btn-container"
            onClick={() => {
              setIsModalOpen(false);
              window.open("/bookings", "_self");
            }}
          >
            X
          </button>
        </div>
        <div className="modal-main-content-wrapper">
          <div className="modal-title-thank-you">
          <h1>Thank You</h1>
          <h3>For Submitting Your Request</h3>
          </div>
          <p>One of our experts will get in touch with you shortly!</p>
        </div>
      </div>
    </div>
  );
}

export default ThankYouModal;
