/** @format */

import React from "react";
import styled from "styled-components";
import profileImg from "../assets/profileimg.jpg";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function HomeStory() {
  return (
    <MainContainer>
      <Container>
        <Slider>
          <button>
            <FaAngleLeft></FaAngleLeft>
          </button>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User1</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User2</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User3</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User4</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User4</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User5</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User5</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User6</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User7</span>
          </div>
          <div>
            <img src={profileImg} width="65" height="65" />
            <span>User8</span>
          </div>
          <button>
            <FaAngleRight></FaAngleRight>
          </button>
        </Slider>
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-shrink: 0;
  background-color: #242526;
  height: 120px;
  margin-bottom: 25px;
`;

const Container = styled.div`
  border: 1px solid #242526;
  border-radius: 3px;
  width: 100%;
  display: flex;
  overflow-x: hidden;
  position: relative;

  button {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
      color: black;
    }
  }

  button:nth-of-type(1) {
    left: 10px;
    top: 40px;
  }

  button:nth-of-type(2) {
    right: 10px;
    top: 40px;
  }
`;

const Slider = styled.div`
  width: 100%;
  display: flex;
  position: absolute;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0px 15px 15px;
    img {
      border-radius: 50%;
    }
    span {
      line-height: 18px;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;
