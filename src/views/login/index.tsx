import React, { useEffect, useState } from "react";
import "./styles.css";

import { useNavigate } from "react-router";

import {
  loginStateHandler,
  userStateHandler,
} from '../../features/login/loginSlice';

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLogin } from "../../features/login/loginSlice";
import Signup from "../../features/login/Signup";
interface IUser {
  userName?: HTMLInputElement | string;
  userPassword?: HTMLInputElement | string;
}

const initialValue : IUser = {
  userName: undefined,
  userPassword: undefined
}

export default function Login() {
  const loginValues = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  const [cantFindUser, setCantFindUser] = useState<boolean|undefined>(undefined);
  const [userInput, setUserInput] = useState(initialValue);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let navigate = useNavigate();



  useEffect(() => {
    if (sessionStorage.getItem("clevergram")) {dispatch(userStateHandler(true));}
    if (!sessionStorage.getItem("clevergram")) {dispatch(userStateHandler(false));}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginValues.userExists]);

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var inputIsValid = validateInput(userInput.userName)&&validateInput(userInput.userPassword);
    if (loginValues.userExists && inputIsValid) {
      const userData: IUser = JSON.parse(sessionStorage.getItem("clevergram")||"");

      //condiciones
      const namesAreSame = userData.userName === userInput.userName;
      const passwordsAreSame =  userData.userPassword === userInput.userPassword;

      if (namesAreSame && passwordsAreSame) {
        navigate("/");
      } else {
        setCantFindUser(true);
        setTimeout(()=>{setCantFindUser(undefined)}, 5000)
      }
    }
  };

  const validateInput = (value:string|HTMLInputElement | undefined) => {
    const isItValid = /^[a-z0-9]+$/i.test(String(value) || "");

    isItValid&&dispatch(loginStateHandler(true));
    !isItValid&&dispatch(loginStateHandler(false));
    return isItValid;
  }


  return (
    <section className="container">
      {loginValues.userExists
      &&<div className="container__card ">
        <h1 className="card__title">CleverGram</h1>

        <form className="card__form " onSubmit={formHandler}>
          <input
            type="text"
            autoComplete="on"
            className="form__input"
            placeholder="Username"
            onInput={({currentTarget}) => {
              if((currentTarget.value!=="")
              &&validateInput(currentTarget.value)){
                let updatedPassword = {'userName':currentTarget.value}
                setUserInput(userInput=>({...userInput,...updatedPassword}))
              }}
            }        
          />
          <input
            type="password"
            autoComplete="on"
            className="form__input"
            placeholder="Password"
            onInput={({currentTarget}) => {
              if((currentTarget.value!=="")
              &&validateInput(currentTarget.value)){
                let updatedPassword = {'userPassword':currentTarget.value}
                setUserInput(userInput=>({...userInput,...updatedPassword}))
              }}
            }            
          />


          <div className="card__errorContainer ">
            {(loginValues.loginInputIsValid === false )&& (
              <p className="errorContainer__errorMessage">The inputs aren't correct</p>
            )}
            {cantFindUser === true && (
              <p className="errorContainer__errorMessage">The inputs doesnt match any existing user</p>
            )}
          </div>
          <button type="submit" className="form__button">Log In</button>
        </form>

      </div>}


      {!loginValues.userExists&&<Signup />}
    </section>
  );
}
