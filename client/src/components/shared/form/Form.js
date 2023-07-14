import { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authServices";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [websites, setWebsites] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const isLoading = useSelector((state) => state?.auth?.loading);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (true) {
      case name === "role":
        setRole(value);
        break;
      case name === "email":
        setEmail(value);
        break;
      case name === "password":
        setPassword(value);
        break;
      case name === "name":
        setName(value);
        break;
      case name === "hospitalName":
        setHospitalName(value);
        break;
      case name === "organizationName":
        setOrganizationName(value);
        break;
      case name === "websites":
        setWebsites(value);
        break;
      case name === "address":
        setAddress(value);
        break;
      case name === "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={(e) => {
            if (formType === "login") {
              return handleLogin(e, email, password, role);
            } else if (formType === "register") {
              return handleRegister(
                e,
                email,
                password,
                role,
                name,
                hospitalName,
                organizationName,
                websites,
                address,
                phone
              );
            }
          }}
          className="w-75"
        >
          <h3 className="text-left">{formTitle}</h3>
          <hr />
          <div className="d-flex  justify-content-between mb-2 ">
            <input
              type="radio"
              className="form-check-input   "
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={changeHandler}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value="admin"
              onChange={changeHandler}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={changeHandler}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organizationRadio"
              value={"organization"}
              onChange={changeHandler}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Organization
            </label>
          </div>

          {/* switch state using immediate invoke function expression (IIFE)*/}
          {(() => {
            switch (true) {
              case formType === "login":
                return (
                  <>
                    <InputType
                      htmlFor={"email"}
                      labelText={"Please Enter Your Email"}
                      inputType={"email"}
                      name={"email"}
                      value={email}
                      onChange={changeHandler}
                    />
                    <InputType
                      htmlFor={"password"}
                      labelText={"Please Enter Your Password"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={changeHandler}
                    />
                  </>
                );
              case formType === "register":
                return (
                  <>
                    <InputType
                      htmlFor={"email"}
                      labelText={"Please Enter Your Email"}
                      inputType={"email"}
                      name={"email"}
                      value={email}
                      onChange={changeHandler}
                    />
                    <InputType
                      htmlFor={"password"}
                      labelText={"Please Enter Your Password"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={changeHandler}
                    />

                    {(role === "donar" || role === "admin") && (
                      <InputType
                        htmlFor={"Name"}
                        labelText={"Enter Your Name"}
                        inputType={"text"}
                        name={"name"}
                        value={name}
                        onChange={changeHandler}
                      />
                    )}
                    {role === "hospital" && (
                      <InputType
                        htmlFor={"hospitalName"}
                        labelText={"Enter Hospital Name"}
                        inputType={"text"}
                        name={"hospitalName"}
                        value={hospitalName}
                        onChange={changeHandler}
                      />
                    )}
                    {role === "organization" && (
                      <InputType
                        htmlFor={"organizationName"}
                        labelText={"Enter Organization Name"}
                        inputType={"text"}
                        name={"organizationName"}
                        value={organizationName}
                        onChange={changeHandler}
                      />
                    )}

                    <InputType
                      htmlFor={"websites"}
                      labelText={"Enter Websites"}
                      inputType={"text"}
                      name={"websites"}
                      value={websites}
                      onChange={changeHandler}
                    />
                    <InputType
                      htmlFor={"phone"}
                      labelText={"Enter Phone"}
                      inputType={"text"}
                      name={"phone"}
                      value={phone}
                      onChange={changeHandler}
                    />
                    <InputType
                      htmlFor={"address"}
                      labelText={"Enter Address"}
                      inputType={"text"}
                      name={"address"}
                      value={address}
                      onChange={changeHandler}
                    />
                  </>
                );
              default:
                break;
            }
          })()}

          <div className="d-flex justify-content-between align-items-center">
            {formType === "login" ? (
              <p>
                Not registered yet ? Register <Link to="/register"> Here!</Link>
              </p>
            ) : (
              <p>
                Already User Please <Link to="/login"> Login!</Link>
              </p>
            )}
            <button type="submit" className="btn btn-primary">
              {submitBtn}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
