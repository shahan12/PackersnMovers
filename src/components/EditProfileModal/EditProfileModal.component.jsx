import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "./EditProfileModal.css";
import OutsideClickHandler from "react-outside-click-handler";
import CrossIcon from "../../images/crossIcon.svg";
import Avatar from "react-avatar-edit";
import UploadImage from "../../images/uploadImg.svg";

function EditProfilePopUp({
  openModal,
  setOpenModal,
  profileImg,
  setprofileImg,
}) {
  const [uploadMode, setUploadMode] = useState(false);
  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={setOpenModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <OutsideClickHandler onOutsideClick={() => setOpenModal(false)}>
          <div className="edit-profile-modal-wrapper">
            <div className="edit-profile-image-wrapper flex">
              <img
                src={CrossIcon}
                alt="Close"
                className="edit-close-icon"
                onClick={() => setOpenModal(false)}
              ></img>
            </div>
            <h2>Upload Photo</h2>
            <div className="edit-profile-upload-wrapper">
              {/* <Avatar style={{ display: "none" }}></Avatar> */}
              <div className="center-div">
                <img
                  className="upload-img"
                  src={UploadImage}
                  alt="upload"
                ></img>
              </div>
              <h3 className="text-h3">Photo upload</h3>
              <p>
                <span className="click-upload">
                  <input
                    type="file"
                    accept="image/*, png, jpeg, jpg"
                    // style={{ display: "none" }}
                    id="input-profile-pic"
                    name="avatar"
                    style={{ display: "none" }}
                  ></input>
                  <label for="input-profile-pic" style={{ cursor: "pointer" }}>
                    Click to upload{" "}
                  </label>
                </span>
                <span className="or-upload"> or </span>
                <span className="drag-drop">drag and drop</span>
              </p>
              <p className="supported-files">
                Supports: JPG, JPEG, PNG (max. size 2MB)
              </p>
            </div>
          </div>
        </OutsideClickHandler>
      </Modal>
    </>
  );
}

export default EditProfilePopUp;
