import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IPost {
  userId: React.Key;
  id: React.Key;
  title: string;
  body: string;
}

interface IhomeState {
  postList: IPost[];
  isSearching: boolean ;
  searchContent: string ;
  filteredPostList:  IPost[] ;
  isopenLogoutBtn: boolean;
  pageNumber: number;
}

const initialState: IhomeState = {
  postList: [], //Array donde se guarde el resultado del fetch
  isSearching: false,
  searchContent: "",
  filteredPostList: [], //array donde se realizan las modificaciones oportunas
  isopenLogoutBtn: false, // |-> en caso de search o delete post
  pageNumber: 1,
};
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPostList: (state, action) => {
      state.postList = action.payload;
      state.filteredPostList = action.payload;
    },
    deleteFromPostList: (state, action)=>{ 
      const idNotSame = (post:IPost) => {
        return (post.id !== action.payload)
      }
      state.postList = state.postList.filter(idNotSame);
      state.filteredPostList = state.postList;
    },
    setisSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setSearchContent: (state, action) => {
      state.searchContent = action.payload;
      state.filteredPostList = state.postList;
      
      const filterItems = (query:string) => {
        return state.postList.filter((post) =>
          post.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      }
      state.filteredPostList = filterItems(action.payload);
    },
    setIsopenLogoutBtn: (state, action) => {
      state.isopenLogoutBtn = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const { 
  setPostList, 
  deleteFromPostList, 
  setisSearching,
  setSearchContent, 
  setIsopenLogoutBtn,
  setPageNumber } = homeSlice.actions;

export const selectHome = (state: RootState) => state.home;

export default homeSlice.reducer;
