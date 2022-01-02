import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLogin, signupStateHandler } from "./loginSlice";
import { useValidateSignUp } from "../../hooks/useValidateSignUp";
interface IUserInput {
  userName: string;
  password: string;
  secondPassword: string | number;
}

const initialValue: IUserInput = {
  userName: "",
  password: "",
  secondPassword: ""
}


const Signup = () => {
  var loginValues = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  const [userInput, setUserInput] = useState(initialValue);
  const [arePasswordSame, setArePasswordSame] = useState<boolean | undefined>();

  const { validateSignup } = useValidateSignUp();

  
    const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const values = {
        userName: userInput.userName ,
        password:  userInput.password,
        secondPassword: userInput.secondPassword,
        setArePasswordSame: setArePasswordSame
      }

      //se encarga de validar y hacer las acciones pertinentes(registrar,
      //mostrar error message)
      validateSignup(values);
    }

    //para esta app se ha simplificado la validacion de los inputs 
    const validateInput = (value:string|HTMLInputElement | undefined) => {
      const isItValid = /^[a-z0-9]+$/i.test(String(value) || "");
  
      isItValid&&dispatch(signupStateHandler(true));
      (value!=="")&&!isItValid&&dispatch(signupStateHandler(false));
      return isItValid;
    }

        return(
          <div className="container__card ">
            <h1 className="card__title">CleverGram</h1>

            <form className="card__form " onSubmit={formHandler}>
              <input
                type="text"
                autoComplete="on"
                className="form__input"
                placeholder="Username"
                onInput={({currentTarget}) => {
                  let isInputValid = validateInput(currentTarget.value);
                  if(isInputValid){
                    let updatedUserName = {'userName':currentTarget.value}
                    setUserInput(userInput=>({...userInput,...updatedUserName}))
                  }
                }}
              />
              <input
                type="password"
                autoComplete="on"
                className="form__input"
                placeholder="Password"
                onInput={({currentTarget}) => {
                  let isInputValid = validateInput(currentTarget.value);
                  if(isInputValid){
                    let updatedPassword = {'password':currentTarget.value}
                    setUserInput(userInput=>({...userInput,...updatedPassword}))
                  }
                }}        
              />

              <input
                type="password"
                autoComplete="on"
                className="form__input"
                placeholder="Password"
                onInput={({currentTarget}) => {
                  let isInputValid = validateInput(currentTarget.value);
                  if(isInputValid){
                    let updatedSecondPass = {'secondPassword':currentTarget.value}
                    setUserInput(userInput=>({...userInput,...updatedSecondPass}))
                  }
                }}
              />

              <div className="card__errorContainer ">
                {(loginValues.signupInputIsValid === false )&& (
                  <p className="errorContainer__errorMessage">The inputs are not valid</p>
                )}
                {(arePasswordSame === false )&& (
                  <p className="errorContainer__errorMessage">The passwords are not same</p>
                )}
              </div>
              
              <button type="submit" className="form__button">
                  Sign Up
              </button>
              
            </form>
          </div>
    );
}


export default Signup;