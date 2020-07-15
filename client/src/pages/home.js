/** @format */

import React from "react";
import Navbar from "../components/navbar";
import styled from "styled-components";

export default function Home() {
  return (
    <MainContainer>
      <Navbar></Navbar>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
`;
