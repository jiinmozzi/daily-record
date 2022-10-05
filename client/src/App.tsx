import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import {useState, useEffect} from "react";

import Layout from "./containers/Layout/Layout";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Travel from "./pages/Travel";
import Terminal from "./pages/Terminal";
import Fitness from "./pages/Fitness";
import Diary from "./pages/Diary";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/home/:year/:month" element={<Home />}></Route>
              <Route path="/diary" element={<Diary />}></Route>
              <Route path="/book" element={<Book />}></Route>
              <Route path="/travel" element={<Travel />}></Route>
              <Route path="/terminal" element={<Terminal />}></Route>
              <Route path="/fitness" element={<Fitness /> }></Route>
            </Route>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
