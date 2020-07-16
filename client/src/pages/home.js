/** @format */

import React from "react";
import Navbar from "../components/navbar";
import styled from "styled-components";
import HomeMain from "../components/home-main";

export default function Home() {
  return (
    <MainContainer>
      <Navbar></Navbar>
      <HomeMain></HomeMain>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
`;
