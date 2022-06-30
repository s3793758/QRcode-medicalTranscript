import React from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Register from "./components/Register";

const App = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <Register />
      </div>
    </div>
  );
};

export default App;
