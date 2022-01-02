import React, { useEffect, useState } from "react";
import "./styles.css";

import ReactPaginate from "react-paginate";
import NavBar from "../../features/home/NavBar";
import CardPost from "../../features/home/CardPost";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  IPost,
  selectHome,
  setPostList,
  setPageNumber,
  setSearchContent,
  setIsopenLogoutBtn,
  deleteFromPostList,
} from "../../features/home/homeSlice";


interface IPagination {
  selected: number;
}

export default function Home() {
  const homeValues = useAppSelector(selectHome);
  const dispatch = useAppDispatch();
  const [catchFetch, setCatchFetch] = useState<boolean>(false)

  let navigate = useNavigate();
  
  useEffect(() => {
    if (!sessionStorage.getItem("clevergram")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (sessionStorage.getItem("clevergram")) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${homeValues.pageNumber}&_limit=16`
      )
        .then((response) => response.json())
        .then((posts) => {
          dispatch(setPostList(posts));
          dispatch(setSearchContent(""));
          setCatchFetch(false);
        })
        .catch(()=>{setCatchFetch(true)});
    }
  }, [homeValues.pageNumber, dispatch]);

  const handlePageClick = (data: IPagination) => {
    dispatch(setPageNumber(data.selected + 1));
    window.scrollTo({top: 0, behavior:"smooth"});
  };

  return (
    <React.Fragment>
      <NavBar />
      <div
        className="home"
        onClick={(event) => {
          dispatch(setIsopenLogoutBtn(false));
          event.stopPropagation();
        }}
      >
        <div className="home__postContainer ">
          {homeValues.filteredPostList &&
            homeValues.filteredPostList.map((post: IPost) => {
              return (
                <CardPost
                  key={post.id}
                  id={post.id}
                  profileIMG={"https://picsum.photos/400/300"}
                  title={post.title}
                  userId={post.userId}
                  postImg={"https://picsum.photos/400/300"}
                  text={post.body}
                  onPostDeleted={(postID: React.Key) => {
                    dispatch(deleteFromPostList(postID));
                  }}
                />
              );
            })}
        </div>

        {/* Error Handling */}
        {(catchFetch!==false)&&<h1 className="home__postError">
          No se puede mostrar actualmente los posts que busca! 404
        </h1>}
        {(homeValues.filteredPostList.length===0)
        &&<h1 className="home__postError">
          No existen posts que coincidan con tu descripción.
        </h1>}
        
        {/* Importo una libreria para la gestión de la paginacion */}
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          className="home__pagination"
          previousClassName="pageManagment"
          nextClassName="pageManagement"
          activeClassName="pagination_activePage"
        />
      </div>
    </React.Fragment>
  );
}
