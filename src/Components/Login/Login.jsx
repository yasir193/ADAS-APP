import React, { useState, useRef } from "react";
import "./login.css";
import axios from "axios";
import { useFormik } from "formik";
import { Vortex } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nationalID, setNationalID] = useState(Array(14).fill("")); // Array of 14 cells

  const navigate = useNavigate();
  const inputsRef = useRef([]); // Refs for the 14 inputs

  // Predefined array of valid National IDs
  const arrayOfUsers = [
    "30002121402537",
    "30001010124353",
    "30004171801745",
    "30209242102615",
    "30205301800326",
    "30201150102804",
  ];

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Allow only one digit per input
    if (/^\d$/.test(value)) {
      const updatedID = [...nationalID];
      updatedID[index] = value;
      setNationalID(updatedID);

      // Move to the next input if it exists
      if (index < 13 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const updatedID = [...nationalID];
      updatedID[index] = ""; // Clear the current cell
      setNationalID(updatedID);

      // Move to the previous input if it exists
      if (index > 0 && inputsRef.current[index - 1]) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  async function loginToProject(values) {
    setIsLoading(true);
    setErrorMsg(null);

    const fullNationalID = nationalID.join(""); // Combine the 14 digits
    if (fullNationalID.length !== 14 || !arrayOfUsers.includes(fullNationalID)) {
      setErrorMsg("Invalid National ID");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      if (data.message === "success") {
        setSuccessMsg(data.message);
        localStorage.setItem('token' , data.token);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (e) {
      setErrorMsg(e.response.data.message);
    }

    setIsLoading(false);
  }

  function validateForm(values) {
    const errors = {};
    if (!values.email.includes("@") || !values.email.includes(".")) {
      errors.email = "Enter a valid Email";
    }
    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  }

  const formikObj = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginToProject,
    validate: validateForm,
  });

  return (
    <>
      <div className="main">
        {errorMsg && (
          <div className="alert w-50 text-center position-fixed mt-5 top-0 z-3 m-auto alert-danger">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="alert w-50 position-fixed top-0 z-3 text-center m-auto alert-success">
            Login success
          </div>
        )}
        <div className="form-containerr">
          <h1>Login Now!</h1>
          <form onSubmit={formikObj.handleSubmit}>
          
            <div className="mb-3">
            
              <div className="nationalID-input">
                
                {Array.from({ length: 14 }, (_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="nationalID-cell"
                    ref={(el) => (inputsRef.current[index] = el)} // Assign refs
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    value={nationalID[index] || ""}
                  />
                ))}
              </div>
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                required
                id="email"
                value={formikObj.values.email}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
              />
              {formikObj.errors.email && formikObj.touched.email && (
                <div className="w-100 mt-3 text-danger">
                  {formikObj.errors.email}
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                id="password"
                value={formikObj.values.password}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
              />
              {formikObj.errors.password && formikObj.touched.password && (
                <div className="w-100 mt-3 text-danger">
                  {formikObj.errors.password}
                </div>
              )}
            </div>

            <button type="submit" className="btn">
              {isLoading ? (
                <Vortex
                  visible={true}
                  height=""
                  width="30"
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={[
                    "#ff009d",
                    "#ff009d",
                    "#FBCB1D",
                    "#FBCB1D",
                    "#029cca",
                    "#029cca",
                  ]}
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="mt-3">
            haven&apos;t an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
