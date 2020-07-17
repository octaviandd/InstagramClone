/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profileImg from "../assets/profileimg.jpg";
import exampleImg from "../assets/example.jpg";

export default function HomeFeed() {
  const [isActive, activate] = useState(false);
  const [value, setValue] = useState("");

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value !== "") {
      activate(true);
    } else {
      activate(false);
    }
    console.log(isActive);
  }, [value]);

  return (
    <MainContainer>
      <Container>
        <RowOne>
          <div>
            <img src={profileImg} width="40" height="40" />
            <span>octaviandd</span>
          </div>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </RowOne>
        <RowTow>
          <div>
            <img src={exampleImg}></img>
          </div>
        </RowTow>
        <RowThree>
          <ButtonsContainer>
            <div>
              <button>
                <svg
                  aria-label="Like"
                  className="_8-yf5 "
                  fill="#262626"
                  height="24"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              </button>
              <button>
                <svg
                  aria-label="Comment"
                  className="_8-yf5 "
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
              </button>
              <button>
                <svg
                  aria-label="Share Post"
                  className="_8-yf5 "
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
                  aria-label="Save"
                  className="_8-yf5 "
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
          <LikesContainer>
            <a href="">
              <span>199 likes</span>
            </a>
          </LikesContainer>
          <CommentsContainer>
            <div>
              <div>
                <a href="#">octaviandd</a> Surprised at the gym
                @eliteathletesperformance yesterday by the one and only
                @justbeingkurt
              </div>
              <div>
                <a href="#">George Soros</a> Great, nice.
              </div>
              <div>
                <a href="#">Bill Gates</a> Nice,man.
              </div>
            </div>
          </CommentsContainer>
          <AddCommentsContainer active={isActive}>
            <input type="text" onChange={(e) => handleInput(e)} />
            <span>Add a comment..</span>
            <button>Post</button>
          </AddCommentsContainer>
        </RowThree>
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RowOne = styled.div`
  background-color: #ffffff;
  height: 60px;
  width: 100%;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-top: 1px solid #dbdbdb;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;

  & > div:nth-of-type(2) {
    position: relative;
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: space-around;

    & > span:nth-of-type(1) {
      width: 3px;
      height: 3px;
      background-color: black;
      display: block;
      border-radius: 50%;
    }
    & > span:nth-of-type(2) {
      width: 3px;
      height: 3px;
      background-color: black;
      display: block;
      border-radius: 50%;
    }
    & > span:nth-of-type(3) {
      width: 3px;
      height: 3px;
      background-color: black;
      display: block;
      border-radius: 50%;
    }
  }

  & > div {
    display: flex;
    align-items: center;
    position: relative;
    img {
      margin-right: 15px;
      border-radius: 50%;
    }
    span {
      font-size: 14px;
      line-height: 18;
      font-weight: 800;
    }
  }
`;

const RowTow = styled.div`
  & > div {
  }
  & > div > img {
    width: 100%;
    object-fit: contain;
  }
`;

const RowThree = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-right: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
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
const CommentsContainer = styled.div`
  padding-left: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    margin-bottom: 7.5px;
    font-size: 14px;
    line-height: 18px;
    a {
      font-weight: 800;
      text-decoration: none;
      color: #363636;
    }
  }
`;

const AddCommentsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
  width: 100%;
  padding: 15px 10px;

  input {
    border: none;
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }

  span {
    left: 12.5px;
    position: absolute;
    color: #dbdbdb;
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
    color: #b1defc;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
`;
