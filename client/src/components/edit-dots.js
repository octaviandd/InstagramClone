/** @format */

import React from "react";
import styled from "styled-components";

export default function EditDots() {
  return (
    <MainContainer>
      <span></span>
      <span></span>
      <span></span>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  & > span:nth-of-type(1) {
    width: 3px;
    height: 3px;
    background-color: whitesmoke;
    display: block;
    border-radius: 50%;
  }
  & > span:nth-of-type(2) {
    width: 3px;
    height: 3px;
    background-color: whitesmoke;
    display: block;
    border-radius: 50%;
  }
  & > span:nth-of-type(3) {
    width: 3px;
    height: 3px;
    background-color: whitesmoke;
    display: block;
    border-radius: 50%;
  }
`;
