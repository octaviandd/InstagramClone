/** @format */

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CommentsContainer from "../components/comments-container";
import { LIKE_POST, UNLIKE_POST } from "../helpers/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CURRENT_USER, GET_ALL_POSTS } from "../helpers/queries";
import { timeDifference } from "../helpers/time-difference";
import EditDots from "../components/edit-dots";
import Spinner from "../components/spinner";
import Heart from "../assets/liked-heart.js";
import UnlikedHeart from "../assets/unliked-heart";
import CommentSVG from "../assets/comment-svg";
import MessageSVG from "../assets/message-svg";
import SaveSVG from "../assets/save-svg";

export default function PostContainer(post) {
  //HOOKS

  //MUTATIONS AND QUERIES
  const { data: data2, loading: loading2, error2: error2 } = useQuery(
    GET_CURRENT_USER
  );

  const [likePost, { error, loading }] = useMutation(LIKE_POST, {
    update(cache, { data: { likePost } }) {
      const data = cache.readQuery({ query: GET_CURRENT_USER });
      const data2 = cache.readQuery({ query: GET_ALL_POSTS });
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { results: { likePost, ...data2.results } },
      });
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          results: { likedPosts: [likePost, ...data.results.likedPosts] },
        },
      });
    },
  });

  const [unlikePost] = useMutation(UNLIKE_POST, {
    update(cache, { data: { unlikePost } }) {
      const data = cache.readQuery({ query: GET_CURRENT_USER });
      const data2 = cache.readQuery({ query: GET_ALL_POSTS });
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { results: { likePost, ...data2.results } },
      });
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          results: { likedPosts: [unlikePost, ...data.results.likedPosts] },
        },
      });
    },
  });

  // COMPONENT METHODS
  const likePostMethod = async () => {
    await likePost({ variables: { input: post.post._id } }).then((res) =>
      console.log(res)
    );
  };

  const unlikePostMethod = async () => {
    await unlikePost({ variables: { input: post.post._id } });
  };

  // ERROR HANDLING

  const commentPostingTime = timeDifference(Date.now(), post.post.createdAt);

  if (error) return error;
  if (loading || loading2) return <Spinner />;

  return (
    <Container>
      <RowOne>
        <div>
          <Link to={`profile/${post.post.author._id}`}>
            <img src={post.post.author.avatar} width="40" height="40" />
            <span>{post.post.author.username}</span>
          </Link>
        </div>
        <EditDots />
      </RowOne>
      <RowTow>
        <div>
          <img src={post.post.picture}></img>
        </div>
      </RowTow>
      <RowThree>
        <ButtonsContainer>
          <div>
            {data2.results.likedPosts.some((el) => el._id === post.post._id) ? (
              <LikedButton onClick={() => unlikePostMethod()}>
                <Heart />
              </LikedButton>
            ) : (
              <NotLikedButton onClick={() => likePostMethod()}>
                <UnlikedHeart />
              </NotLikedButton>
            )}
            <Link to={`post/${post.post._id}`}>
              <CommentsButton>
                <CommentSVG />
              </CommentsButton>
            </Link>
            <button>
              <MessageSVG />
            </button>
          </div>
          <div>
            <button>
              <SaveSVG />
            </button>
          </div>
        </ButtonsContainer>
        <LikesContainer>
          <a href="">
            {post.post.likes.length > 0 && (
              <span>
                {post.post.likes.length === 1
                  ? `${post.post.likes.length} like`
                  : `${post.post.likes.length} likes`}
              </span>
            )}
          </a>
        </LikesContainer>
        <CommentsContainer
          postComments={post.post.comments}
          id={post.post._id}
          username={post.post.author.username}
          author={post.post.author._id}
          description={post.post.description}
          createdAt={post.post.createdAt}
        ></CommentsContainer>
      </RowThree>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  border-radius: 6px;
  position: relative;
  border: none;
  -webkit-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  -moz-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
`;

const RowOne = styled.div`
  background-color: #201d1e;
  height: 60px;
  width: 100%;
  border-left: 1px solid #201d1e;
  border-right: 1px solid #201d1e;
  border-top: 1px solid #201d1e;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;

  & > div {
    display: flex;
    align-items: center;
    position: relative;
    height: 60px;
    a {
      line-height: 60px;
      display: flex;
      font-size: 0;
      height: 60px;
      align-items: center;
      text-decoration: none;
      color: whitesmoke;
      img {
        margin-right: 15px;
        border-radius: 50%;
      }
      span {
        line-height: 60px;
        font-size: 14px;
        font-weight: 800;
      }
    }
  }
`;

const RowTow = styled.div`
  & > div {
    display: flex;
    min-height: 500px;
    background-color: white;
    border-left: 0.5px solid #201d1e;
    border-right: 0.5px solid #201d1e;
  }
  & > div > img {
    width: 100%;
    object-fit: cover;
  }
`;

const RowThree = styled.div`
  display: flex;
  background-color: #03191d;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 5px;
  border-right: 1px solid #201d1e;
  border-left: 1px solid #201d1e;
  border-bottom: 1px solid #201d1e;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  position: relative;
`;

const ButtonsContainer = styled.div`
  padding-left: 10px;
  padding-top: 5px;
  padding-right: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    justify-content: space-around;
    button {
      cursor: pointer;
      background-color: inherit;
      border: none;
    }

    button:nth-of-type(2),
    button:nth-of-type(1) {
      margin-right: 10px;
    }
  }
`;
const LikesContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 7.5px;
  padding-left: 10px;

  a {
    font-size: 14px;
    line-height: 18px;
    font-weight: 800;
    text-decoration: none;
    color: whitesmoke;
  }
`;

const LikedButton = styled.button`
  background-color: #c609ec;
`;

const NotLikedButton = styled.button``;

const CommentsButton = styled.button``;
