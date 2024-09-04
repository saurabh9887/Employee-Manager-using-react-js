import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddEmployee from "./pages/AddEmployee/AddEmployee.jsx";
import SingleEmp from "./pages/singleEmp/SingleEmp.jsx";
import UpdateEmployee from "./UpdateEmployee/UpdateEmployee.jsx";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/show/:id" element={<SingleEmp />} />
        <Route path="/edit/:paramId" element={<UpdateEmployee />} />
      </Routes>
    </div>
  );
};

export default App;
