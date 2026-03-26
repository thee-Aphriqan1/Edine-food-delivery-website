import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/App.css";

function RestaurantLogInForm() {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation function to check if all required fields are filled
  const isFormValid = () => {
    return (
      businessEmail.trim() !== "" &&
      businessPassword.trim() !== "" &&
      businessEmail.includes("@")
    );
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(businessEmail, businessPassword);
    // Show success message after submission
    setSuccessMessage("Login successful! Welcome back.");
    setIsSubmitted(true);
    // Clear the message after 5 seconds
    setTimeout(() => setSuccessMessage(""), 5000);
  };
  return (
    <>
      <div
        className="container mt-5 w-100 d-flex justify-content-center align-items-center"
        id="LogIn"
      >
        <form method="post" onSubmit={handleSubmit}>
          <h3 className="mb-3" id="logInEdine">
            Restaurant Log In
          </h3>
          <p className="text-muted mb-3">
            Log In to manage Your Business Account
          </p>

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
              type="email"
              id="businessEmail"
              className="form-control"
              placeholder="Enter Business Email"
              name="businessEmail"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
            />
            <label htmlFor="businessEmail" className="form-label">
              Business Email
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              id="businessPassword"
              className="form-control"
              placeholder="Enter Account Password"
              name="businessPassword"
              value={businessPassword}
              onChange={(e) => setBusinessPassword(e.target.value)}
            />
            <label htmlFor="businessPassword" className="form-label">
              Password
            </label>
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <span>
              <input
                type="checkbox"
                id="rememberMe"
                className="form-check-input"
                name="rememberMe"
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Remember Me
              </label>
            </span>

            <span>
              <a href="#" className="text-muted" id="forgotPasswordLink">
                Forgot Password ?
              </a>
            </span>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className=" btn btn-primary w-100"
              id="loginBtn"
              disabled={!isFormValid() || isSubmitted}
            >
              {isSubmitted ? "Login Successful!" : "Log In"}
            </button>
          </div>
          <div className="mb-3">
            <p>
              Already have an account
              <Link
                to="/RestaurantSignUpForm"
                className="text-decoration-none"
                id="signUpLink"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
export default RestaurantLogInForm;
