/** @format */

import React from "react";
import styled from "styled-components";
import profileImg from "../assets/profileimg.jpg";
import {
  GET_CURRENT_USER,
  GET_USER_POSTS,
  GET_USER_BY_ID,
} from "../helpers/queries";
import { useQuery } from "@apollo/client";
import Navbar from "../components/navbar";

export default function Profile(props) {
  console.log(props.match.params.id);
  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  const { data: data1, loading: loading1, error: error1 } = useQuery(
    GET_USER_POSTS
  );
  const { data: data2, loading: loading2, error: error2 } = useQuery(
    GET_USER_BY_ID,
    {
      variables: { input: props.match.params.id },
    }
  );

  console.log(data2);

  if (loading || loading1) return "Loading...";
  if (error || error1) return `Error! ${error.message}`;

  const { followers, following, username } = data.getMe;

  return (
    <>
      <Navbar></Navbar>
      <MainContainer>
        <RowOne>
          <div>
            <img src={profileImg} width="150" height="150" />
          </div>
          <div>
            <div>
              <p>{username && username}</p>
              <button>Edit Profile</button>
              <button>
                <a href="#">
                  <svg
                    aria-label="Options"
                    className="_8-yf5 "
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </button>
            </div>
            <div>
              <span>
                <strong>{data1 && data1.getUserPosts.length}</strong> post
              </span>
              <span>
                <strong>{followers && followers.length}</strong> followers
              </span>
              <span>
                <strong>{following && following.length}</strong> following
              </span>
            </div>
          </div>
        </RowOne>
        <RowTwo>
          <div>
            <span>
              <svg
                aria-label="Posts"
                fill="#262626"
                height="12"
                viewBox="0 0 48 48"
                width="12"
              >
                <path
                  clipRule="evenodd"
                  d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span>POSTS</span>
            </span>
          </div>
          <div>
            <div>
              {data1 &&
                data1.getUserPosts.map((post) => {
                  return (
                    <img
                      key={post.picture}
                      src={post.picture}
                      width="300"
                      height="300"
                      alt={post._id}
                    ></img>
                  );
                })}
            </div>
          </div>
        </RowTwo>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const RowOne = styled.div`
  padding: 30px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  max-width: 975px;
  justify-content: space-between;
  width: 100%;
  padding-left: 50px;
  padding-bottom: 50px;
  & > div:nth-of-type(1) {
    margin-right: 100px;
    img {
      border-radius: 50%;
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 4;
    & > div:nth-of-type(1) {
      width: 100%;
      display: flex;
      p {
        font-size: 28px;
      }
      button:nth-of-type(1) {
        cursor: pointer;
        margin-left: 20px;
        margin-right: 15px;
        background-color: #ffffff;
        border: 1px solid #dbdbdb;
        padding: 3px 9px;
        border-radius: 5px;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.2px;
      }
      button:nth-of-type(2) {
        background-color: transparent;
        border: none;
      }
    }
    & > div:nth-of-type(2) {
      margin-top: 30px;
      display: flex;
      width: 100%;
      span:nth-of-type(2) {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
`;

const RowTwo = styled.div`
  padding: 25px 0px;
  max-width: 975px;
  width: 100%;

  & > div:nth-of-type(1) {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
    span {
      position: relative;
      span {
        margin-left: 5px;
        letter-spacing: 2px;
        font-size: 14px;
      }
    }
    & > span:nth-of-type(1):after {
      content: "";
      width: 70px;
      top: -26px;
      height: 1px;
      color: black;
      display: block;
      position: absolute;
      background-color: black;
    }
  }

  & > div:nth-of-type(2) {
    img {
      object-fit: contain;
    }
  }
`;
