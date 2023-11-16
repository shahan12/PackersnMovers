import "./App.css";
import Header from "./components/header/header.component";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/home";
import Login from "./pages/login/login.component";
import SignUp from "./pages/signUp/signup.component";
import Footer from "./components/footer/footer.component";
import AboutUs from "./pages/aboutUs/aboutUs.component";
import { AppProvider } from "./context/context";
import Order from "./pages/order/orders.component";
import EditProfile from "./pages/editProfile/edit-profile.component";
import { useEffect, useState } from "react";
import Bookings from "./pages/bookings/Bookings.component";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(sessionStorage.getItem("loggedIn")) || false
  );
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
        <Route
          exact
          path="/fill-details"
          element={ isAuthenticated ? (<Order />) : (<Navigate to="/?login-redirect=true" replace />)}
        />
        <Route
          exact 
          path="/edit-profile"
          element={ isAuthenticated ? (<EditProfile />) : (<Navigate to="/?login-redirect=true" replace />)} />
        <Route 
          exact 
          path="/bookings" 
          element={ isAuthenticated ? (<Bookings />) : (<Navigate to="/?login-redirect=true" replace />)} />
      </Routes>
      <Footer />
    </AppProvider>
  );
}

export default App;
