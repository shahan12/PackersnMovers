import React, { useState } from "react";
import "./edit-profile.css";
import DefaultImg from "../../images/default-profile.svg";
function EditProfile(props) {
  const [profileImg, setProfileImg] = useState(DefaultImg);
  return (
    <div className="edit-profile-wrapper">
      <h2>My Profile</h2>
      <div className="border-bottom"></div>
      <div className="edit-profile-img-wrapper center-div">
        <img
          src={profileImg}
          alt="profile-pic"
          className="edit-profile-img"
        ></img>
        <button className="edit-profile-upload-btn">Edit</button>
      </div>
      <form className="edit-profile-form">
        <div className="edit-profile-row-one">
          <div className="edit-profile-input-wrapper">
            <label for="fname" className="edit-profile-form-label">
              First name
            </label>{" "}
            <br></br>
            <input
              type="text"
              id="fname"
              name="fname"
              className="edit-profile-form-input"
            />{" "}
            <br></br>
          </div>
          <div className="edit-profile-input-wrapper">
            <label for="fname" className="edit-profile-form-label">
              Last name
            </label>{" "}
            <br></br>
            <input
              type="text"
              id="lname"
              name="lname"
              className="edit-profile-form-input"
            />{" "}
            <br></br>
          </div>
        </div>
        <div className="edit-profile-row-one">
          <div className="edit-profile-input-wrapper">
            <label for="fname" className="edit-profile-form-label">
              Email
            </label>{" "}
            <br></br>
            <input
              type="email"
              id="email"
              name="email"
              className="edit-profile-form-input"
            />{" "}
            <br></br>
          </div>
          <div className="edit-profile-input-wrapper">
            <label for="fname" className="edit-profile-form-label">
              Mobile No.
            </label>{" "}
            <br></br>
            <input
              type="number"
              id="fname"
              name="fname"
              className="edit-profile-form-input"
            />{" "}
            <br></br>
          </div>
        </div>
      </form>
      <div className="edit-profile-CTA-container flex">
        <button className="secondary-cta">Cancel</button>
        <button className="cta-button" disabled={true}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
