import React, { useState } from "react";
import InputType from "../form/InputType";
import {  toast } from "react-toastify";
import { useSelector } from "react-redux";
import API from "../../../services/API";
const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("1");
 const {user} =useSelector(state=>state.auth)
  const submitModalHandler = async () => {
    try {
      if (!bloodGroup) {
        toast.error("Fields Required");
      }
      if(!quantity || quantity<1){
      toast.error('Quantity Should be 1 or More')
      }
     else{
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        inventoryType,
        bloodGroup,
        organization:user?.user?._id,
        quantity,
      });
     if(data?.success){
    toast.success(data?.message)
    window.location.replace('/')}
    }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
  };
  const clearInputFields=()=>{
    setInventoryType('in')
    setEmail('')
    setBloodGroup('')
  
  }
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex ">
                Blood Type:&nbsp;
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    value="in"
                    onChange={(e) => setInventoryType(e.target.value)}
                    checked={inventoryType === 'in'}
                     
                    className="form-check-input"
                  />
                  <label htmlFor="on" className="form-check-label">
                    In
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    value="out"
                    checked={inventoryType === 'out'}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="out" className="form-check-label">
                    Out
                  </label>
                </div>
              </div>
              {/* =-============ Blood Group */}
              <select
                className="form-select mb-2 mt-2"
                aria-label="Default select "
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option>Select Blood Group</option>
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
              <InputType
                labelText={`${inventoryType==='in'?'Donar Email':'Hospital Email'}`}
                labelFor={`donar-email`}
                inputType={`email`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
         
            
              <InputType
                labelText={`quantity`}
                labelFor={`quantity`}
                inputType={`number`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={clearInputFields}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitModalHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
