/** @format */

import React from "react";
import styled from "styled-components";
import profileImg from "../assets/profileimg.jpg";

export default function HomeFriends() {
  return (
    <MainContainer>
      <Profile>
        <img src={profileImg}></img>
        <a href="#">octaviandd</a>
      </Profile>
      <Suggestions>
        <div>
          <p>Suggestions For You</p>
          <a href="#">See all</a>
        </div>
        <div>
          <div>
            <img src={profileImg}></img>
            <p>JohnDoe1</p>
          </div>
          <button>Follow</button>
        </div>
        <div>
          <div>
            <img src={profileImg}></img>
            <p>JohnDoe2</p>
          </div>
          <button>Follow</button>
        </div>
        <div>
          <div>
            <img src={profileImg}></img>
            <p>JohnDoe3</p>
          </div>
          <button>Follow</button>
        </div>
        <div>
          <div>
            <img src={profileImg}></img>
            <p>JohnDoe4</p>
          </div>
          <button>Follow</button>
        </div>
        <div>
          <div>
            <img src={profileImg}></img>
            <p>JohnDoe5</p>
          </div>
          <button>Follow</button>
        </div>
      </Suggestions>
      <Watermark>
        <p>Made by Octavian David</p>
        <a href="http://github.com/octaviandd">
          <i className="fab fa-github"></i>
        </a>
      </Watermark>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  max-width: 293px;
  height: 100vh;
  width: 100%;
`;

const Suggestions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 3.5px;
    margin-bottom: 3.5px;

    div {
      display: flex;
      p {
        font-size: 14px;
        line-height: 18px;
        font-size: 14px;
        font-weight: bold;
        color: black;
      }
      img {
        margin-right: 7.5px;
      }
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    button {
      border: none;
      color: #0095f6;
      background-color: inherit;
      font-weight: bold;
      font-size: 12px;
      cursor: pointer;
    }
  }

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 14px;
      line-height: 18px;
      color: #8f8f8f;
      font-weight: bold;
    }
    a {
      font-size: 14px;
      line-height: 18px;
      text-decoration: none;
      color: black;
      font-weight: bold;
    }
  }
`;
const Watermark = styled.div`
  background-color: #fafafa;
  display: flex;
  margin-top: 3rem;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
  }
  a {
    margin-top: 1rem;
    color: black;
    font-size: 20px;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding-top: 2rem;
  img {
    margin-right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  a {
    text-decoration: none;
    color: #262626;
    font-weight: bold;
  }
`;
