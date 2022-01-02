import { useAppDispatch, useAppSelector } from "../app/hooks";
import {  
  selectLogin,
  userStateHandler, 
  signupStateHandler} from "../features/login/loginSlice";
import useSignIn from "./useSignUp";

  interface IInput {
    userName?: string;
    password?: string;
    secondPassword?: string | number;
    setArePasswordSame: (value:boolean|undefined) => void;
}

//En este ejemplo lo ideal seria hacer el custom hook con useState en vez de Redux pero
//se ha simulado el hook con el uso de Redux para un mayor contacto de la app con Redux
export function useValidateSignUp(){
    var dispatch = useAppDispatch();

    const { initClevergramSession } = useSignIn();

    const validateSignup=({userName, password, secondPassword, setArePasswordSame}:IInput)=>{

        var isNameValid = /^[a-z0-9]+$/i.test(String(userName) || "");
        var isPasswordValid = /^[a-z0-9]+$/i.test(String(password) || "");

        //condiciones
        const inputIsValid =  isNameValid && isPasswordValid;
        const PasswordsSame = password === secondPassword;

        if (inputIsValid && PasswordsSame) {
            initClevergramSession({
              userName: userName,
              userPassword: password
            });
            dispatch(userStateHandler(true));
        }


        if(!inputIsValid){
          dispatch(signupStateHandler(false));
          setTimeout(()=> {dispatch(signupStateHandler(undefined))},2000);
        };

        if(!PasswordsSame){
          setArePasswordSame(false);
          setTimeout(() => {setArePasswordSame(undefined)}, 2000)
        }
    }

    //Si fuese con estados, aqui se realizaria el destructuring pertinente para el
    //posterior uso de los estados dentro del componente padre
    return {validateSignup}
};  

export default useValidateSignUp;