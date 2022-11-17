import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import {useState, useEffect} from "react";

import Layout from "./containers/Layout";
import Main from "./pages/Main";
import Planner from "./pages/Planner";
import Asset from "./pages/Asset";
import AssetPortfolio from "./pages/AssetPortfolio";
import AssetDetail from "./pages/AssetDetail";
import Book from "./pages/Book";
import BookSearch from "./pages/BookSearch";
import Travel from "./pages/Travel";
import Terminal from "./pages/Terminal";
import Fitness from "./pages/Fitness";
import Diary from "./pages/Diary";
import BucketList from "./pages/BucketList";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Test from "./pages/Test";
import getAutoLoginUser from "./api/getAutoLoginUser";
import getRefTokenUser from "./api/getRefTokenUser";
import reIssueAccessToken from "./api/reIssueAccessToken";
import { useRecoilState } from "recoil";
import { accessTokenState, refreshTokenState, sidState, userState, isLoggedInState } from "./store/atom";

import ScrollToTop from "./components/ScrollToTop";

import sendRequest from "./api/sendRequest";
import { UserType } from "./types";
import axios from "axios";


function App() {
  const [sid, setSid] = useRecoilState<string>(sidState);
  const [user, setUser] = useRecoilState<UserType>(userState);
  const [refreshToken, setRefreshToken] = useRecoilState<string>(refreshTokenState);
  const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLoggedInState);
  
  useEffect(():void => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if ( isLoggedIn === "true" ){
      setIsLoggedIn(true);
    }
    const cookies = document.cookie?.split('; ').map(e => e.split("="));
    const sidCookieArray = cookies?.filter(e => e[0] === "sid");
    const fakeSidCookieArray = cookies?.filter(e => e[0] === "_sid");
    const refreshCookieArray = cookies?.filter(e => e[0] === "refreshToken");
    const fakeRefreshCookieArray = cookies?.filter(e => e[0] === "_refreshToken");
    
    // 
    if (fakeSidCookieArray.length > 0 && !isLoggedIn ){    
      const getUserWithSid = async() => {
        return await getAutoLoginUser();
      }
      getUserWithSid().then(res => {
        
        if (res.status === 404)  return;
        else {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setSid(res.data.randomSessionId);
          setUser({
            uid : res.data.user._id,
            name : res.data.user.name,
            id : res.data.user.id,
            email : res.data.user.email,
            birthday : res.data.user.birthday
          })
          window.sessionStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
        }
      })
    }

    if ( fakeRefreshCookieArray.length > 0 && !user.uid && isLoggedIn ){
      const getUserWithRefreshToken = async () => {
        return await getRefTokenUser();
      }
      getUserWithRefreshToken().then(res => {
        if (res.status === 404){
          return;
        } else {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setUser({
            uid : res.data.user._id,
            name : res.data.user.name,
            id : res.data.user.id,
            email : res.data.user.email,
            birthday : res.data.user.birthday
          })
          window.sessionStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
        }
      })
    }
  }, [])
  
  // periodically re-issue access token
  useEffect(() => {
    console.log('set access token') 
    console.log('accessToken : ', accessToken);
    const reIssueUserAccessToken = async() => {
      return await reIssueAccessToken(accessToken);
    }
    if ( accessToken ){
      const timer = setInterval(() => {
        reIssueUserAccessToken().then(res => {
          if (res.status === 401 || res.status === 400){
            
            return;
          } else {
            console.log('set access token') 
            setAccessToken(res.data.accessToken);
          }
        })
      }, 29.5 * 60 * 1000)
      
      return () => clearInterval(timer);
    }
  }, [accessToken])

  // useEffect(() => {  
  //   const test = async() => {
  //     return await sendRequest('', "GET", {accessToken : accessToken}, true, accessToken);
  //   }
  //   if (accessToken !== ""){
  //     test().then(res => console.log(res));
  //   }
  // }, [accessToken])

  

  return (
    <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/planner" element={<Planner />}></Route>
              <Route path="/planner/:year/:month" element={<Planner />}></Route>
              <Route path="/diary" element={<Diary />}></Route>
              <Route path="/book" element={<Book />}></Route>
              <Route path="/asset" element={<Asset />}></Route>
              <Route path="/asset/portfolio" element={<AssetPortfolio />}></Route>
              <Route path="/asset/:ticker" element={<AssetDetail />}></Route>
              <Route path="/travel" element={<Travel />}></Route>
              <Route path="/bucketlist" element={<BucketList />}></Route>
              <Route path="/terminal" element={<Terminal />}></Route>
              <Route path="/fitness" element={<Fitness /> }></Route>
              <Route path="/test" element={<Test />}></Route>
              <Route path="/book/:bookTitle" element={<BookSearch />}></Route>
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
