import "./App.css";
import Header from "./components/header/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
