import { useState } from "react";
import { Link } from "react-router-dom";
import "/src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function RestaurantSignUpForm() {
  const [restaurantName, setRestaurantName] = useState("");
  const [applicantFullName, setApplicantFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhoneNumber, setbusinessPhoneNumber] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [privacyTerms, setPrivacyTerms] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation function to check if all required fields are filled the trim function is meant for removing spaces
  const isFormValid = () => {
    return (
      restaurantName.trim() !== "" &&
      applicantFullName.trim() !== "" &&
      businessEmail.trim() !== "" &&
      businessPhoneNumber.trim() !== "" &&
      businessPassword.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      businessPassword === confirmPassword &&
      privacyTerms
    );
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  we create an object to put the business infomation in it helps in data submission
    const businessInfo = {
      businessEmail,
      businessPassword,
      applicantFullName,
      restaurantName,
      confirmPassword,
    };
    // this is a post request we are sending data to the backend to create a new restaurant account
    try {
      const response = await fetch("http://localhost:5000/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessInfo),
      });
      //  This  outputs the data sent to the server
      const result = await response.json();
      // Show success message and update form state
      setSuccessMessage("Sign up successful! Welcome to Edine.");
      setIsSubmitted(true);
      // Clear the message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div
        className="container w-50 "
        d-flex
        justify-content-center
        align-items-center
        text-align-center
        id="SignUp"
      >
        <form onSubmit={submitForm} method="post" className="mt-5 rounded-3">
          <div className="d-flex justify-content-center">
            <h3 className="mb-3" id="joinEdine">
              Join Edine
            </h3>
          </div>

          {successMessage && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {successMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccessMessage("")}
                title="Close alert"
              ></button>
            </div>
          )}

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              id="restaurantName"
              name="restaurantName"
              placeholder="Enter Restaurant Name"
              max="15"
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
              max="20"
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
              max="10"
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
              min="8"
              max="20"
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
              min="8"
              max="20"
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
              checked={privacyTerms}
              onChange={(e) => setPrivacyTerms(e.target.checked)}
              disabled={isSubmitted}
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
          </div>

          <div className="mb-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary w-75"
              id="signUpBtn"
              disabled={!isFormValid() || isSubmitted}
            >
              {isSubmitted ? "Account Created!" : "Sign Up"}
            </button>
          </div>

          <div className="mb-3 d-flex justify-content-center text-align-center">
            <p>
              Already have an account ?
              <Link to="/" id="Login">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default RestaurantSignUpForm;
