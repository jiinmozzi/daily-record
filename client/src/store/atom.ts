import {atom} from "recoil";
import * as React from "react";
import { UserType } from "../types";

export const userState = atom<UserType>({
    key : "userState",
    default : {
        uid : "",
        name : "",
        id : "",
        email : "",
        birthday : "",
    },
})

export const sidState = atom<string>({
    key : "sidState",
    default : "",
})

export const accessTokenState = atom<string>({
    key : "accessTokenState",
    default : "",
})

export const refreshTokenState = atom<string>({
    key : "refreshTokenState",
    default : "",
})

export const isLoggedInState = atom<boolean>({
    key : "isLoggedInState",
    default : false,
}) 

export {}