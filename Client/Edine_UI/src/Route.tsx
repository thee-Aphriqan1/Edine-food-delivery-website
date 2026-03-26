import { Route, Routes } from "react-router-dom";
import RestaurantLogInForm from "./Components/RestaurantLogInForm";
import RestaurantSignUpForm from "./Components/RestaurantSignUpForm";
import RestaurantDashboard from "./pages/RestaurantDashboard";

// Instead of showing both forms on one page, you can route them as follows
function RouteForm() {
  return (
    <Routes>
      <Route path="/" element={<RestaurantLogInForm />} />
      <Route path="/RestaurantSignUpForm" element={<RestaurantSignUpForm />} />
      <Route path="/RestaurantDashboard" element={<RestaurantDashboard />} />
    </Routes>
  );
}

export default RouteForm;
