import React, { useState,  useRef  }  from "react";
import "./Register.css";
import axios from "axios";
import { useFormik } from "formik";
import { Vortex } from "react-loader-spinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()
  
    
    
  
  // Initial user data
  const initialUserData = {
    userName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  // Register new user function
  async function registerNewUser(values) {
    setIsLoading(true);
    setErrorMsg(null); // Reset error message

    try {
      
      const { data } = await axios.post(
        "https://be-grad.vercel.app/auth/signup",
        values
      );

      if (data.message === "Creation success!") {
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigate('/login')
        }, 1500);
      }
    } catch (e) {
      
      setErrorMsg(e.response.data.message);
    }

    setIsLoading(false);
  }
  function validateForm(values) {
    const errors = {};
    if (values.userName.length < 4 || values.name.length > 20) {
      errors.name = "Name must be at least 4 characters";
    }

    if (!values.email.includes("@") || !values.email.includes(".")) {
      errors.email =   "Enter a valid Email";
    }

    if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
      errors.phone = "Enter a valid phone number";
    }

    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword =  "Passwords don't match";
    }

    return errors;
  }
  // Formik object for handling form state and validation
  const formikObj = useFormik({
    initialValues: initialUserData,
    onSubmit: registerNewUser,
    validate: validateForm,
  });

  return (
    <>
    
      <div className="main">
      {errorMsg ? <div className="alert w-50 text-center position-fixed mt-5 top-0 z-3 m-auto alert-danger">{errorMsg}</div> : ""}
      {successMsg ? (
          <div className="alert w-50 position-fixed top-0 z-3 text-center m-auto alert-success">
            Successfully Registered
          </div>
        ) : (
          ""
        )}
        <div className="form-container">
          <h1>Register Now!</h1>
          <form onSubmit={formikObj.handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                required
                id="userName"
                value={formikObj.values.userName}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
              />
              {/* Display the error dynamically */}
              {formikObj.errors.userName && formikObj.touched.userName && (
                <div className="w-100 mt-3 text-danger">{formikObj.errors.userName}</div>
              )}
            </div>
          
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone"
                required
                id="phone"
                value={formikObj.values.phone}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
              />
              {/* Display the error dynamically */}
              {formikObj.errors.phone && formikObj.touched.phone && (
                <div className="w-100 mt-3 text-danger">{formikObj.errors.phone}</div>
              )}
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
              {/* Display the error dynamically */}
              {formikObj.errors.email && formikObj.touched.email && (
                <div className="w-100 mt-3 text-danger">{formikObj.errors.email}</div>
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
              {/* Display the error dynamically */}
              {formikObj.errors.password && formikObj.touched.password && (
                <div className="w-100 mt-3 text-danger">{formikObj.errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                required
                id="confirmPassword"
                value={formikObj.values.confirmPassword}
                onChange={formikObj.handleChange}
                onBlur={formikObj.handleBlur}
              />
              {/* Display the error dynamically */}
              {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword && (
                <div className="w-100 mt-3 text-danger">{formikObj.errors.confirmPassword}</div>
              )}
            </div>
            <button type="submit" className="btn">
            { isLoading ? <Vortex
              visible={true}
              height=""
              width="30"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['#ff009d', '#ff009d', '#FBCB1D', '#FBCB1D', '#029cca', '#029cca']}
            />  : 'Sign up' }
            </button>
          </form>
          <p className="mt-3">
            have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
