import React, { useState } from "react";
import "./edit-profile.css";
import DefaultImg from "../../images/default-profile.svg";
import EditProfilePopUp from "../../components/EditProfileModal/EditProfileModal.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';


function EditProfile(props) {
  const [profileImg, setProfileImg] = useState(DefaultImg);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {" "}
      <div className="edit-profile-wrapper">
        <h2>My Profile</h2>
        <div className="border-bottom"></div>
        <div className="edit-profile-img-wrapper center-div">
          <img
            src={profileImg}
            alt="profile-pic"
            className="edit-profile-img"
          ></img>
          <button
            className="edit-profile-upload-btn"
            onClick={() => setOpenModal(!openModal)}
          >
            Edit
          </button>
          {openModal && (
            <EditProfilePopUp
              openModal={openModal}
              setOpenModal={setOpenModal}
              setProfileImg={setProfileImg}
              profileImg={profileImg}
            />
          )}
        </div>

        
        
        <div className="container">
        <form className="form-group">
          <div className="row">
            <div className="col-12 col-md-6 mr-3 mx-auto">
              <label for="fname" className="label form-label">
                First name
              </label>{" "}
              <br></br>
              <input
                type="text"
                id="fname"
                name="fname"
                className="form-control"
              />{" "}
              <br></br>
            </div>
            <div className="col-12 col-md-6">
              <label for="lname" className="label form-label">
                Last name
              </label>{" "}
              <br></br>
              <input
                type="text"
                id="lname"
                name="lname"
                className="form-control"
              />{" "}
              <br></br>
            </div>
          </div>
          <div className="row">
          <div className="col-12 col-md-6">
              <label for="fname" className="label form-label">
                Email
              </label>{" "}
              <br></br>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
              />{" "}
              <br></br>
            </div>
            <div className="col-12 col-md-6">
              <label for="fname" className="label form-label">
                Mobile No.
              </label>{" "}
              <br></br>
              <input
                type="number"
                id="fname"
                name="fname"
                className="form-control"
              />{" "}
              <br></br>
            </div>
          </div>
          
          
          <div className="row mt-4">
</div>        
          </form>
          </div>
          <div className="container">
  <div className="d-flex justify-content-end mb-4">
    <button
      type="button"
      className="col-5 col-md-2 btn btn-secondary mx-1"
    >
      Cancel
    </button>
    <button
      type="button"
      className="col-5 col-md-2 btn mx-1"
      
      style={{ backgroundColor: "#ff7800", borderColor: "#ff7800", color: "#fff" }}
    >
      Save Changes
    </button>
  </div>
</div>
        
        
      </div>
    </>
  );
}

export default EditProfile;
