/** @format */

import React, { useState } from "react";
import Navbar from "../components/navbar";
import styled from "styled-components";
import HomeMain from "../components/home-main";
import { GET_CURRENT_USER } from "../helpers/queries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { data } = useQuery(GET_CURRENT_USER);

  return (
    <MainContainer>
      <Navbar userID={data && data.getMe.id}></Navbar>
      <HomeMain userID={data && data.getMe.id}></HomeMain>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
`;
