import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectHome, setIsopenLogoutBtn } from "./homeSlice";

import SearchInput from "./SearchInput";

const NavBar = () => {
  const homeValues = useAppSelector(selectHome);
  const dispatch = useAppDispatch();

  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  let navigate = useNavigate();

  useEffect(() => {
    searchInputRef && searchInputRef.current?.focus();
  }, [homeValues.isSearching]);

  const searchInputDisplay: React.CSSProperties = {
    display: `${
      (!homeValues.isSearching && "none") || (homeValues.isSearching && "block")
    }`,
  };
  const userMenuDisplay: React.CSSProperties = {
    display: `${
      (!homeValues.isopenLogoutBtn && "none") ||
      (homeValues.isopenLogoutBtn && "block")
    }`,
    position: "absolute",
  };

  const logOut = () => {
    sessionStorage.removeItem("clevergram");
    dispatch(setIsopenLogoutBtn(false));
    navigate("/login");
  };
  return (
    <nav className="nav">
      <h1 className="nav__logo">CleverGram</h1>
      <SearchInput
        inputRef={searchInputRef}
        isInputDisplayed={searchInputDisplay}
      />
      <div className="nav_user">
        <button
          className="user__button"
          onClick={() => {
            dispatch(setIsopenLogoutBtn(!homeValues.isopenLogoutBtn));
            setTimeout(()=>{
              dispatch(setIsopenLogoutBtn(homeValues.isopenLogoutBtn))
            },4000)
          }}
          //se ha utilizado un setTimeOut porque habia un conflicto
          //entre el onScroll event del home que se utilizaba para 
          //para cerrar el btn y el scroll to top de la paginacion
          //y se ha optado por este recurso por tiempo
        />
        <div className="user__menu" style={userMenuDisplay}>
          <button
            onClick={() => {
              logOut();
            }}
            className="menu__logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
