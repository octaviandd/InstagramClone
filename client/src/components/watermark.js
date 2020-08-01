/** @format */

import React from "react";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";

export default function Watermark() {
  return (
    <MainContainer>
      <p>Made by Octavian David</p>
      <a href="http://github.com/octaviandd">
        <FaGithub />
      </a>
    </MainContainer>
  );
}

const MainContainer = styled.div`
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
    svg {
      height: 25px;
      width: 25px;
    }
  }
`;
