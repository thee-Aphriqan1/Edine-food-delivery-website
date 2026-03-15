// import {
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
// } from "react-router-dom";
import RestaurantLogInForm from "../Components/RestaurantLogInForm";
import RestaurantSignUpForm from "../Components/RestaurantSignUpForm";

function RestaurantForms() {
  return (
    <>
      <RestaurantLogInForm />
      <RestaurantSignUpForm />
    </>
  );
}
export default RestaurantForms;
