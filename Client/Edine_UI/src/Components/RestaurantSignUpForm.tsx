import { useState } from "react";

import "/src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";
// import {} from "react-dom";

function RestaurantSignUpForm() {
  const [restaurantName, setRestaurantName] = useState("");
  const [applicantFullName, setApplicantFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhoneNumber, setbusinessPhoneNumber] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [privacyTerms, setPrivacyTerms] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(
      businessEmail,
      businessPassword,
      applicantFullName,
      privacyTerms,
      restaurantName,
    );
  };

  return (
    <>
      <div className="container w-50 " id="SignUp">
        <form onSubmit={submitForm} method="post" className="mt-5 rounded-3">
          <div className="d-flex justify-content-center">
            <h3 className="mb-3" id="joinEdine">
              Join Edine
            </h3>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              id="restaurantName"
              name="restaurantName"
              placeholder="Enter Restaurant Name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
            <label htmlFor="restaurantName" className="form-label text-">
              Restaurant Name
            </label>
          </div>
          <div className="form-floating mb-3 ">
            <input
              className="form-control"
              type="text"
              id="applicantFullName"
              name="applicantFullName"
              placeholder="Enter FullName"
              value={applicantFullName}
              onChange={(e) => setApplicantFullName(e.target.value)}
            />
            <label htmlFor="applicantFullName" className="form-label">
              Full Name
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="email"
              id="businessEmail"
              name="businessEmail"
              placeholder="Enter business email"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
            />
            <label htmlFor="businessEmail" className="form-label">
              Enter Your Business Email
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="tel"
              id="businessPhoneNumber"
              name="businessPhoneNumber"
              placeholder="Enter Phone Number"
              value={businessPhoneNumber}
              onChange={(e) => setbusinessPhoneNumber(e.target.value)}
            />
            <label htmlFor="businessPhoneNumber" className="form-label">
              Phone Number
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              id="businessPassword"
              name="businessPassword"
              placeholder="Enter Your Password"
              value={businessPassword}
              onChange={(e) => setBusinessPassword(e.target.value)}
            />
            <label htmlFor="businessPassword" className="form-label">
              Password
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
          </div>

          <div
            className="mb-3 mb-3 d-flex justify-content-center"
            id="legalTerms"
          >
            <input
              type="checkbox"
              name="privacyTerms"
              id="legalTerms"
              className="form-check-input"
              value={privacyTerms}
              onChange={(e) => setPrivacyTerms(e.target.value)}
            />
            <label
              htmlFor="legalTerms"
              className="form-label"
              id="legalPermission"
            >
              I agree to the
              <a href="#" id="legalPage">
                Terms & privacy Terms
              </a>
            </label>
            {/* <span>
              <p className="">I agree to the privacy Terms</p>
            </span> */}
          </div>

          <div className="mb-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary w-75"
              id="signUpBtn"
            >
              Sign Up
            </button>
            {/* <button type="reset" className="btn btn-secondary w-25">
              Cancel
            </button> */}
          </div>

          <div className="mb-3 d-flex justify-content-center text-align-center">
            <p>
              Already have an account ?
              <a href="#" id="Login">
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default RestaurantSignUpForm;
