import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import {useState, useEffect} from "react";
import Layout from "./containers/Layout";
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

import getAutoLoginUser from "./api/getAutoLoginUser";
import getRefTokenUser from "./api/getRefTokenUser";
import { useRecoilState } from "recoil";
import { accessTokenState, refreshTokenState, sidState, userState, isLoggedInState } from "./store/atom";


import { UserType } from "./types";
import axios from "axios";

function App() {
  const [sid, setSid] = useRecoilState<string>(sidState);
  const [user, setUser] = useRecoilState<UserType>(userState);
  const [refreshToken, setRefreshToken] = useRecoilState<string>(refreshTokenState);
  const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInState);
  useEffect(():any => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if ( isLoggedIn === "true" ){
      setIsLoggedIn(true);
    }
    const cookies = document.cookie?.split('; ').map(e => e.split("="));
    const sidCookieArray = cookies?.filter(e => e[0] === "sid");
    const fakeSidCookieArray = cookies?.filter(e => e[0] === "_sid");
    const refreshCookieArray = cookies?.filter(e => e[0] === "refreshToken");
    const fakeRefreshCookieArray = cookies?.filter(e => e[0] === "_refreshToken");
    
    console.log(sessionStorage.getItem("isLoggedIn"));
    if (fakeSidCookieArray.length > 0 && !user.uid){    
      const getUserWithSid = async() => {
        return await getAutoLoginUser();
      }
      getUserWithSid().then(res => {
        if (res.data.status === 404)  return;
        else {
          setAccessToken(res.data.data.accessToken);
          setRefreshToken(res.data.data.refreshToken);
          setSid(res.data.data.randomSessionId);
          setUser({
            uid : res.data.data.user._id,
            name : res.data.data.user.name,
            id : res.data.data.user.id,
            email : res.data.data.user.email,
            birthday : res.data.data.user.birthday
          })
          window.sessionStorage.setItem("isLoggedIn", "true");
        }
      })
    }

    if ( fakeRefreshCookieArray.length > 0 && !user.uid && isLoggedIn ){
      const getUserWithRefreshToken = async () => {
        return await getRefTokenUser();
      }
      getUserWithRefreshToken().then(res => {
        if (res.data.status === 404){
          return;
        } else {
          setAccessToken(res.data.data.accessToken);
          setRefreshToken(res.data.data.refreshToken);
          setUser({
            uid : res.data.data.user._id,
            name : res.data.data.user.name,
            id : res.data.data.user.id,
            email : res.data.data.user.email,
            birthday : res.data.data.user.birthday
          })
          window.sessionStorage.setItem("isLoggedIn", "true");
        }
      })
    }
  }, [])
  useEffect(() => {
    console.log("access", accessToken);
    console.log("refresh", refreshToken);
    console.log("sid", sid);
    console.log("user", user);
  }, [accessToken, refreshToken, user, sid]);
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
