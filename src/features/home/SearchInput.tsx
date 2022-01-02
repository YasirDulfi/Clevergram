import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React from "react";
import { selectHome, setisSearching, setSearchContent } from "./homeSlice";
import SearchIcon from "../../assets/search.png";

interface IPropSearch {
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    isInputDisplayed:  React.CSSProperties;
}
const SearchInput = (props:IPropSearch) => {
    const homeValues = useAppSelector(selectHome);
    const dispatch = useAppDispatch();
  
    return(
        <div className="nav__search">
          <input
            type="text"
            className="search__input"
            style={props.isInputDisplayed}
            ref={props.inputRef}
            onInput={({currentTarget}) => {
              dispatch(setSearchContent(currentTarget.value));
              currentTarget.value===""
              &&setTimeout(()=>{dispatch(setisSearching(false))}, 5000);
            }}
           
          />
          <img
            src={SearchIcon}
            className="search__img"
            alt=""
            onClick={() => {
              dispatch(setisSearching(!homeValues.isSearching));
            }}
          />
      </div>
    );
}

export default SearchInput;