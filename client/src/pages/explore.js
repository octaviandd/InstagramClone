/** @format */

import React from "react";
import styled from "styled-components";
import Navbar from "../components/navbar";

export default function Explore() {
  console.log("hee");
  return (
    <>
      <MainContainer>
        <Container></Container>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  background-color: #18191a;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 975px;
  width: 100%;
  display: flex;
`;
