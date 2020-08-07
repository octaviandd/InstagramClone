/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import {
  GET_POST,
  GET_CURRENT_USER,
  GET_POST_COMMENTS,
} from "../helpers/queries";
import { useQuery, useMutation } from "@apollo/client";
import { timeDifference } from "../helpers/time-difference";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { LIKE_POST, UNLIKE_POST, NEW_COMMENT } from "../helpers/mutations";
import { useForm } from "react-hook-form";
import UnlikedHeart from "../assets/unliked-heart";
import Heart from "../assets/liked-heart.js";
import Spinner from "../components/spinner";

export default function Post({
  match: {
    params: { id },
  },
}) {
  // HOOKS

  const [content, setContent] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const [isActive, activate] = useState(false);
  const [comments, setComments] = useState(null);

  // MUTATIONS && QUERIES

  const { data, loading } = useQuery(GET_POST, { variables: { input: id } });

  const { data: data2, loading: loading2, error2: error2 } = useQuery(
    GET_CURRENT_USER
  );
  const [likePost] = useMutation(LIKE_POST, {
    update(cache, { data: { likePost } }) {
      const data = cache.readQuery({ query: GET_CURRENT_USER });
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
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          results: { likedPosts: [unlikePost, ...data.results.likedPosts] },
        },
      });
    },
  });

  const [createComment] = useMutation(NEW_COMMENT, {
    update(cache, { data: { createComment } }) {
      const data = cache.readQuery({
        query: GET_POST_COMMENTS,
        variables: { input: id },
      });
      console.log(data);
      cache.writeQuery({
        query: GET_POST_COMMENTS,
        variables: { input: id },
        data: { results: [createComment, ...data.results] },
      });
    },
  });

  // COMPONENT METHODS
  const likePostMethod = async () => {
    await likePost({ variables: { input: id } });
  };

  const unlikePostMethod = async () => {
    await unlikePost({ variables: { input: id } });
  };

  const handleInput = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (formData) => {
    createComment({
      variables: { input: { content: formData.content, _id: id } },
    }).then((res) => {
      setComments(res);
    });
    setContent("");
  };

  if (loading) return <Spinner />;
  const timer = timeDifference(Date.now(), data.results.createdAt);

  // ERROR HANDLING

  return (
    <>
      <Navbar />
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
                data2.results.likedPosts.some((el) => el._id === id) ? (
                  <LikedButton onClick={() => unlikePostMethod()}>
                    <Heart />
                  </LikedButton>
                ) : (
                  <NotLikedButton onClick={() => likePostMethod()}>
                    <UnlikedHeart />
                  </NotLikedButton>
                )}
              </div>
            </ButtonsContainer>
            <LikesContainer>
              <a href="">
                {data && data.results.likes.length > 0 && (
                  <span>
                    {data.results.likes.length === 1
                      ? `${data.results.likes.length} like`
                      : `${data.results.likes.length} likes`}
                  </span>
                )}
              </a>
            </LikesContainer>
            <CommentsContainer>
              <Timer style={{ marginLeft: "10px" }}>{timer && timer}</Timer>
              <AddCommentsContainer active={isActive}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    name="content"
                    onChange={(e) => handleInput(e)}
                    value={content}
                    ref={register({ required: true, minlength: 1 })}
                  />
                  <span>Add a comment..</span>
                  <button type="submit">Post</button>
                </form>
              </AddCommentsContainer>
            </CommentsContainer>
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
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(32, 29, 30, 1) 35%,
    rgba(3, 25, 29, 1) 100%
  );
`;

const LeftRow = styled.div`
  position: relative;
  img {
    top: 0;
    left: 0;
    height: 600px;
    width: 600px;
    object-fit: cover;
  }
`;

const Topbar = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  padding: 15px 15px;
  align-items: center;
  color: whitesmoke;
  img {
    width: 32px;
    height: 32px;
    margin-right: 12.5px;
    margin-left: 10px;
    border-radius: 50%;
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
    color: whitesmoke;
    font-weight: 600;
    margin-right: 4px;
    word-wrap: break-word;
  }

  span {
    word-wrap: break-word;
    color: whitesmoke;
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
        border-radius: 50%;
      }
    }
    & > div:nth-of-type(2) {
      a {
        font-weight: 600;
        word-wrap: break-word;
        margin-right: 4px;
        text-decoration: none;
        color: whitesmoke;
      }
      span {
        word-wrap: break-word;
        color: whitesmoke;
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
  color: whitesmoke;
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
    color: black;
  }
`;

const LikedButton = styled.button`
  background-color: red;
`;

const NotLikedButton = styled.button``;

const CommentsButton = styled.button``;

const CommentsContainer = styled.div``;

const AddCommentsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
  width: 100%;

  form {
    padding: 15px 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  input {
    border: none;
    font-size: 14px;
    background: #0f1b1d;
    color: whitesmoke;
    &:focus {
      outline: none;
    }
  }

  span {
    left: 12.5px;
    position: absolute;
    color: whitesmoke;
    font-size: 14px;
    line-height: 18px;
    pointer-events: none;
    ${({ active }) =>
      active &&
      `
        display: none;
      `}
  }

  button {
    font-size: 16px;
    background-color: transparent;
    color: #8f94fb;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
`;
