import React, { useEffect, useState } from "react";
import "./edit-profile.css";
import DefaultImg from "../../images/default-profile.svg";
import EditProfilePopUp from "../../components/EditProfileModal/EditProfileModal.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
import Edit from "../../images/location-edit.svg";
import { getUserInfoFromBackend, updateUserInfoToBackend } from "../../API/apicalls";
import { performLogout } from "../../components/FillRequirements/Requirement.component";
import authmiddleware from "../../authmiddleware";

function EditProfile(props) {
  const [profileImg, setProfileImg] = useState(DefaultImg);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber,setPhoneNumber]=useState(sessionStorage.getItem('phoneNumber'));
  const [disabled, setDisabled] = useState(true);
  const [firstName,setFirstName]=useState("");
  const [lastName,setlastName]=useState("");
  const [email,setEmail]=useState("");
  

  let identifier = sessionStorage.getItem('identifier');

  const handleUpdataProfile=async()=>{
    console.log(firstName,lastName,email,identifier);
    if(identifier) {
      try{
      const updateUserInfoResponse=await updateUserInfoToBackend({firstName,lastName,email,identifier});
      if (updateUserInfoResponse === 'updated') {
        alert("Profile updated Successfully");
      } else {
        alert("Something went wrong, please try later!");
        performLogout();
      }
      setDisabled(!disabled)
      }
      catch(err){
        window.alert("User Data save error. Please re-try");
      }

    } else {
      performLogout();
    }
  }

  const getUserInfo = async () => {
    try {
      const userInfoResponse = await getUserInfoFromBackend(identifier);
  
      if(userInfoResponse?.type === 'serverError') {
        alert("Please Try later!");
      } else if (userInfoResponse?.type === 'invalidToken') {
        alert("Please Try later!");
        performLogout();
      } else {
        const bookingData = authmiddleware.decryptData(userInfoResponse);
        const { user_f_name, user_l_name, user_email, user_mobile } = bookingData[0];
        setFirstName(user_f_name);
        setlastName(user_l_name);
        setEmail(user_email);
        setPhoneNumber(user_mobile);
      }

    } catch (err) {
      console.error(err);
      window.alert("User Data fetch error. Please re-try");
    }
  };
  
  useEffect(() => {
    
    if(identifier) {
    getUserInfo();
    }
    else {
      performLogout();
    }
  }, []);

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
          <img
              src={Edit}
              alt={"Edit-Icon"}
              className="edit-icon"
              onClick={() => {
                setDisabled(!disabled);
              }}
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
      style={{ backgroundColor: "#ff7800", borderColor: "#ff7800", color: "#fff", width:"10rem" }}
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
