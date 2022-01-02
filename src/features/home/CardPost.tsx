import React from "react";

interface IPostData {
  id: React.Key;
  profileIMG: string;
  title: string;
  userId: React.Key;
  postImg: string;
  text: string;
  onPostDeleted: (PostID:React.Key) => void;
}

const CardPost = (props: IPostData) => {

  return (
    <div className="postContainer__card ">
      <div className="post_top">
          <div className="top__profileContainer ">
            <img
              className="profileImgContainer__profileImg"
              src={props.profileIMG}
              alt="Profile Img"
            />
          </div>
          <div className="top__postInfo">
            <h3>
              {props.title}
              <br />
              <span>{`UserID:${props.userId}`}</span>
            </h3>
          </div>
        <button
          className="top__deletePost"
          onClick={() => {
            props.onPostDeleted(props.id);
          }}
        />
      </div>
      <div className="post__imageBox">
        <img className="imageBox__image" src={props.postImg} alt="Post Content" />
      </div>
      <h3 className="post__imageText">{props.text}</h3>
    </div>
  );
};

export default React.memo(CardPost);
