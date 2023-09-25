import "./App.css";
import Header from "./components/header/header.component";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/home";
import Login from "./pages/login/login.component";
import SignUp from "./pages/signUp/signup.component";
import Footer from "./components/footer/footer.component";
import AboutUs from "./pages/aboutUs/aboutUs.component";
import { AppProvider } from "./context/context";
import Order from "./pages/order/orders.component";

function App() {
  return (
    <AppProvider>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login-in" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/fill-details" element={<Order />} />
      </Routes>
      <Footer />
    </AppProvider>
  );
}

export default App;
