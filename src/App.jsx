import AddMovie from "./Components/AddMovie";
import Card from "./Components/Card";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Details from "./Components/Details";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Error404 from "./Components/Errorpage";
export const appState = createContext()
function App() {
  const [login, setLogin] = useState(false)
  const [userName, setUserName] = useState("")

  // useEffect(() => {

  //   },[])
  return (
    <appState.Provider value={{ userName, login, setUserName, setLogin }}>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404/>}/>
        </Routes>
        <ToastContainer />
      </div>
    </appState.Provider>
  );
}

export default App;