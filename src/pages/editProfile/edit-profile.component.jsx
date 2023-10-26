import React, { useEffect, useState } from "react";
import "./edit-profile.css";
import DefaultImg from "../../images/default-profile.svg";
import EditProfilePopUp from "../../components/EditProfileModal/EditProfileModal.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
import Edit from "../../images/location-edit.svg";
import { getUserInfoFromBackend, updateUserInfoToBackend } from "../../API/apicalls";

function EditProfile(props) {
  const [profileImg, setProfileImg] = useState(DefaultImg);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber,setPhoneNumber]=useState(sessionStorage.getItem('phoneNumber'));
  const [disabled, setDisabled] = useState(true);
  const [firstName,setFirstName]=useState(sessionStorage.getItem('firstName') || "");
  const [lastName,setlastName]=useState(sessionStorage.getItem('lastName') || "");
  const [email,setEmail]=useState(sessionStorage.getItem('email') || "");

  const handleUpdataProfile=async()=>{
    console.log("new profile data");
    console.log(firstName, lastName, email, phoneNumber);
    sessionStorage.setItem('firstName',firstName);
    sessionStorage.setItem('lastName',lastName);
    sessionStorage.setItem('email',email);
    const updateUserInfoResponse=await updateUserInfoToBackend({firstName,lastName,email,phoneNumber});
    console.log("after updating user info backend sent this ", updateUserInfoResponse);
    setDisabled(!disabled)
  }

  const getUserInfo=async()=>{
    const userInfoResponse=await getUserInfoFromBackend({phoneNumber});
    console.log("got user info as : ", userInfoResponse);
    let{user_f_name,user_l_name,user_email}=userInfoResponse[0];
    sessionStorage.setItem('firstName',user_f_name);
    sessionStorage.setItem('lastName',user_l_name);
    sessionStorage.setItem('email',user_email);
    setFirstName(user_f_name);
    setlastName(user_l_name);
    setEmail(user_email);
  }

  if(sessionStorage.getItem('firstName')===null){
    console.log("getting user info");
    getUserInfo();
  }


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
          {/* <button
            className="edit-profile-upload-btn"
            onClick={() => setOpenModal(!openModal)}
          >
            Edit
          </button> */}
          {openModal && (
            <EditProfilePopUp
              openModal={openModal}
              setOpenModal={setOpenModal}
              setProfileImg={setProfileImg}
              profileImg={profileImg}
            />
          )}
        </div>

        <img
            src={Edit}
            alt={"Edit-Icon"}
            className="edit-icon"
            onClick={() => {
              setDisabled(!disabled);
            }}
        ></img>
        
        
        <div className="container">
        <form className="form-group">
          <div className="row">
            <div className="col-12 col-md-6 mr-3 mx-auto">
              <label htmlFor="fname" className="label form-label">
                First name
              </label>{" "}
              <br></br>
              <input
                type="text"
                id="fname"
                name="fname"
                disabled={disabled}
                value={firstName}
                onChange={(e)=> setFirstName(e.target.value)}
                className="form-control"
              />{" "}
              <br></br>
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="lname" className="label form-label">
                Last name
              </label>{" "}
              <br></br>
              <input
                type="text"
                id="lname"
                name="lname"
                disabled={disabled}
                value={lastName}
                onChange={(e)=> setlastName(e.target.value)}
                className="form-control"
              />{" "}
              <br></br>
            </div>
          </div>
          <div className="row">
          <div className="col-12 col-md-6">
              <label htmlFor="fname" className="label form-label">
                Email
              </label>{" "}
              <br></br>
              <input
                type="email"
                id="email"
                name="email"
                disabled={disabled}
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="form-control"
              />{" "}
              <br></br>
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="fname" className="label form-label">
                Mobile No.
              </label>{" "}
              <br></br>
              <input
                type="number"
                id="fname"
                name="fname"
                value={phoneNumber}
                disabled
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
      onClick={()=> handleUpdataProfile()}
      style={{ backgroundColor: "#ff7800", borderColor: "#ff7800", color: "#fff" }}
    >
      Save Changes
    </button>
    {/* <button type="button" onClick={()=> getUserInfo()}>Get Data</button> */}
  </div>
</div>
        
        
      </div>
    </>
  );
}

export default EditProfile;
