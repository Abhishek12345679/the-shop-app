import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

import config from "../../config";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (token, userId, email, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogOutTimer(expiryTime)); //some fault here
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
      email: email,
    });
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        config.FIREBASE_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        resData.email,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = UTCtoISTConverter(resData.expiresIn);

    console.log(expirationDate);

    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.email,
      expirationDate
    );
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        config.FIREBASE_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        resData.email,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = UTCtoISTConverter(resData.expiresIn);

    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.email,
      expirationDate
    );
  };
};

const saveDataToStorage = (token, userId, email, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      email: email,
      expiryDate: expirationDate,
    })
  );
};

const clearLogOutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogOutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const logout = () => {
  clearLogOutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOG_OUT };
};

const UTCtoISTConverter = (expiresInTime) => {
  let d = new Date();
  console.log(d.toISOString());
  const offset = 5.5 * 60;

  const expirytime = parseInt(expiresInTime) / 60;

  let minutes = d.setMinutes(d.getMinutes() + offset + expirytime);
  console.log(minutes);

  let datestring = d.toISOString();
  console.log(datestring);

  return datestring;
};
