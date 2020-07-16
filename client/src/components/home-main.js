/** @format */

import React from "react";
import styled from "styled-components";
import HomeStory from "./home-story";
import HomeFriends from "./home-friends";
import HomeFeed from "./home-feed";

export default function HomeMain() {
  return (
    <MainContainer>
      <ContainerColOne>
        <HomeStory></HomeStory>
        <HomeFeed></HomeFeed>
      </ContainerColOne>
      <ContainerColTwo>
        <HomeFriends></HomeFriends>
      </ContainerColTwo>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  margin-top: 25px;
  min-height: 100vh;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const ContainerColOne = styled.div`
  position: relative;
  display: flex;
  max-width: 614px;
  width: 100%;
  margin-right: 28px;
  height: 100%;
`;

const ContainerColTwo = styled.div`
  max-width: 293px;
  width: 100%;
`;
