import "./App.css";
import Header from "./components/header/header.component";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/home";
import Login from "./pages/login/login.component";
import SignUp from "./pages/signUp/signup.component";
import Footer from "./components/footer/footer.component";
import AboutUs from "./pages/aboutUs/aboutUs.component";

import PrivacyPolicy from "./pages/Policy/privacyPolicy.component";
import TACPolicy from "./pages/Policy/tacPolicy.component";
import RefundsPolicy from "./pages/Policy/refundsPolicy.component";

import ShiftingDetails from "./pages/shiftingDetails/shiftingDetails.component";
import { AppProvider } from "./context/context";
import Order from "./pages/order/orders.component";
import EditProfile from "./pages/editProfile/edit-profile.component";
import { useEffect, useState } from "react";
import Bookings from "./pages/bookings/Bookings.component";
import Payments from "./pages/payments/Payments.component";
import RetryPayments from "./pages/retrypayments/RetryPayments.component";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   () => JSON.parse(sessionStorage.getItem("loggedIn")) || false
  //   );
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem("loggedIn") || false);

  const [loginModal, setLoginModal] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AppProvider>
      <Header
        showPopUp={showPopUp}
        isAuthenticated={isAuthenticated}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              showPopUp={showPopUp}
              setShowPopUp={setShowPopUp}
              loginModal={loginModal}
              setLoginModal={setLoginModal}
            />
          }
        />
        <Route exact path="/login-in" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route exact path="/Refunds-cancellation-policy" element={<RefundsPolicy />} />
        <Route exact path="/TAC-policy" element={<TACPolicy />} />
        <Route exact path="/shifting-details" element={<ShiftingDetails />} />
        <Route
          exact
          path="/fill-details"
          element={
            isAuthenticated && sessionStorage.getItem('token') && sessionStorage.getItem('identifier') ? (
              <Order
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/?login-redirect=true" replace />
            )
          }
        />
        <Route
          exact
          path="/edit-profile"
          element={isAuthenticated && sessionStorage.getItem('token') && sessionStorage.getItem('identifier') ? (<EditProfile isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />) : (<Navigate to="/?login-redirect=true" replace />)} />
        <Route
          exact
          path="/bookings"
          element={isAuthenticated && sessionStorage.getItem('token') && sessionStorage.getItem('identifier') ? (<Bookings isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />) : (<Navigate to="/?login-redirect=true&bookings-page=true" replace />)} />
        <Route
          exact
          path="/payments"
          element={isAuthenticated && sessionStorage.getItem('token') && sessionStorage.getItem('identifier') ? (<Payments isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />) : (<Navigate to="/?login-redirect=true" replace />)} />
        <Route
          exact
          path="/retrypayments"
          element={isAuthenticated && sessionStorage.getItem('token') && sessionStorage.getItem('identifier') ? (<RetryPayments isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />) : (<Navigate to="/?login-redirect=true" replace />)} />
      </Routes>
      
      <Footer />
    </AppProvider>
  );
}

export default App;
