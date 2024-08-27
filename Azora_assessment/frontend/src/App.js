import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ItemsPage from "./Pages/ItemsPage";
import bg from "../src/bg.mp4";

function App() {
  return (
    <div className="App">
      <video className="background-video" autoPlay loop muted>
        <source src={bg} type="video/mp4" />
      </video>

      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path="/items" Component={ItemsPage} />
        <Route path="/home" Component={HomePage} />
      </Routes>
    </div>
  );
}

export default App;
