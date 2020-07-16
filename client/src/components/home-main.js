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
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #fafafa;
`;

const ContainerColOne = styled.div`
  position: relative;
  display: flex;
`;

const ContainerColTwo = styled.div``;
