/** @format */

import React from "react";
import styled from "styled-components";
import { GET_POST, GET_CURRENT_USER, GET_ALL_POSTS } from "../helpers/queries";
import { useQuery, useMutation } from "@apollo/client";
import { timeDifference } from "../helpers/time-difference";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { LIKE_POST, UNLIKE_POST } from "../helpers/mutations";

export default function Post({
  match: {
    params: { id },
  },
}) {
  const { data, loading } = useQuery(GET_POST, { variables: { input: id } });

  const { data: data2, loading: loading2, error2: error2 } = useQuery(
    GET_CURRENT_USER
  );

  console.log(data2);

  const [likePost] = useMutation(LIKE_POST, {
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

  const likePostMethod = async () => {
    await likePost({ variables: { input: data2.results._id } });
  };

  const unlikePostMethod = async () => {
    await unlikePost({ variables: { input: data2.results._id } });
  };

  if (loading) return "Loading...";
  const timer = timeDifference(Date.now(), data.results.createdAt);

  return (
    <>
      {/* <Navbar /> */}
      <MainContainer>
        <PostModal>
          <LeftRow>
            <img src={`${data && data.results.picture}`}></img>
          </LeftRow>
          <RightRow>
            <Topbar>
              <img src={`${data && data.results.author.avatar}`}></img>
              <p>{data && data.results.author.username}</p>
            </Topbar>
            <PostDescription>
              <div>
                <div>
                  <img src={`${data && data.results.author.avatar}`}></img>
                </div>
                <div>
                  <div>
                    <Link to={`${data.results.author._id}`}>
                      {data && data.results.author.username}
                    </Link>
                    <span>{data && data.results.description}</span>
                  </div>
                  <div>
                    <Timer>{timer.replace("hours ago", "h")}</Timer>
                  </div>
                </div>
              </div>
            </PostDescription>
            <CommentsList>
              {data.results.comments.map((comment) => {
                return (
                  <Comment key={comment._id}>
                    <CommentLogo>
                      <Logo src={`${comment.author.avatar}`}></Logo>
                    </CommentLogo>
                    <CommentSection>
                      <div>
                        <Link to={`${comment.author._id}`}>
                          {comment.author.username}
                        </Link>
                        <span>{comment.content}</span>
                      </div>
                      <div>
                        <Timer>{timer.replace("hours ago", "h")}</Timer>
                      </div>
                    </CommentSection>
                  </Comment>
                );
              })}
            </CommentsList>
            <ButtonsContainer>
              <div>
                {data2 &&
                data2.results.likedPosts.some(
                  (el) => el._id === data2.results._id
                ) ? (
                  <LikedButton onClick={() => unlikePostMethod()}>
                    <svg
                      fill="#ed4956"
                      height="24"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                  </LikedButton>
                ) : (
                  <NotLikedButton onClick={() => likePostMethod()}>
                    <svg
                      fill="#262626"
                      height="24"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                  </NotLikedButton>
                )}
                <Link to={`post/${data2.results._id}`}>
                  <CommentsButton>
                    <svg
                      fill="#262626"
                      height="24"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        clipRule="evenodd"
                        d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </CommentsButton>
                </Link>
                <button>
                  <svg
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                  </svg>
                </button>
              </div>
              <div>
                <button>
                  <svg
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                  </svg>
                </button>
              </div>
            </ButtonsContainer>
            <div></div>
            <div></div>
          </RightRow>
        </PostModal>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div``;

const PostModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

const RightRow = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 300px;
  background-color: #ffffff;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
`;

const LeftRow = styled.div`
  img {
    height: 600px;
    width: 600px;
    object-fit: contain;
    border: 1px solid #dbdbdb;
  }
`;

const Topbar = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  padding: 15px 15px;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    margin-right: 12.5px;
    margin-left: 10px;
  }
`;

const CommentsList = styled.div`
  height: 350px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
`;

const Comment = styled.div`
  display: flex;
  padding: 15px 15px;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: black;
    font-weight: 600;
    margin-right: 4px;
    word-wrap: break-word;
  }

  span {
    word-wrap: break-word;
  }
`;

const CommentLogo = styled.div`
  margin-right: 10px;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

const PostDescription = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 15px;
  flex-direction: column;

  & > div:nth-of-type(1) {
    align-items: center;
    display: flex;

    & > div:nth-of-type(1) {
      margin-right: 10px;
      img {
        width: 32px;
        height: 32px;
      }
    }
    & > div:nth-of-type(2) {
      a {
        font-weight: 600;
        word-wrap: break-word;
        margin-right: 4px;
        text-decoration: none;
        color: black;
      }
      span {
        word-wrap: break-word;
      }
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Timer = styled.time`
  font-size: 10px;
  letter-spacing: 0.2px;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 4px;
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
      background-color: transparent;
      border: none;
    }
    button:nth-of-type(2) {
      margin-left: 10px;
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
    color: black;
  }
`;

const LikedButton = styled.button`
  background-color: red;
`;

const NotLikedButton = styled.button``;

const CommentsButton = styled.button``;
