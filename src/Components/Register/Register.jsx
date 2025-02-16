import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useFormik } from "formik";
import { Vortex } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const initialUserData = {
    userName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function registerNewUser(values) {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const { data } = await axios.post(
        "https://be-grad.vercel.app/auth/signup",
        values
      );

      if (data.message === "Creation success!") {
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        // Handle cases where the server responds with a success status code but the message is not "Creation success!"
        setErrorMsg(data.message || "Registration failed. Please try again."); // Display a generic message or the server's specific message
      }
    } catch (error) {
      // More robust error handling
      console.error("Registration error:", error); // Log the full error for debugging
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message); // Prioritize server error message
      } else if (error.message) {
        setErrorMsg(error.message); // Fallback to client-side error message
      } else {
        setErrorMsg("An error occurred during registration. Please try again later."); // Generic error message
      }
    } finally {
      setIsLoading(false);
    }
  }

  function validateForm(values) {
    const errors = {};

    if (!values.userName || values.userName.length < 4 || values.userName.length > 20) {
      errors.userName = "Name must be between 4 and 20 characters";
    }

    if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Enter a valid email";
    }

    if (!values.phone || !/^(02)?01[0125][0-9]{8}$/.test(values.phone)) {
      errors.phone = "Enter a valid Egyptian phone number";
    }

    if (!values.password || values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    return errors;
  }

  const formikObj = useFormik({
    initialValues: initialUserData,
    onSubmit: registerNewUser,
    validate: validateForm,
  });

  return (
    <div className="main">
      {errorMsg && <div className="alert w-50 text-center position-fixed mt-5 top-0 z-3 m-auto alert-danger">{errorMsg}</div>}
      {successMsg && (
        <div className="alert w-50 position-fixed top-0 z-3 text-center m-auto alert-success">
          {successMsg} {/* Display the actual success message from the server */}
        </div>
      )}
      <div className="form-container">
        <h1>Register Now!</h1>
        <form onSubmit={formikObj.handleSubmit}>
          {/* ... (rest of your form code) */}
          <button type="submit" className="btn">
            {isLoading ? (
              <Vortex
                visible={true}
                height=""
                width="30"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['#ff009d', '#ff009d', '#FBCB1D', '#FBCB1D', '#029cca', '#029cca']}
              />
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <p className="mt-3">
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}