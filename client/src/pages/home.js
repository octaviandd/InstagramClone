/** @format */

import React from "react";
import Navbar from "../components/navbar";
import styled from "styled-components";
import HomeMain from "../components/home-main";
import { GET_CURRENT_USER } from "../helpers/queries";
import { useQuery } from "@apollo/client";
import Spinner from "../components/spinner";

export default function Home() {
  // MUTATIONS && QUERIES
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  // ERROR && LOADING HANDLING
  if (loading) return <Spinner />;
  if (error) return error;

  return (
    <MainContainer>
      <Navbar id={data && data.results._id}></Navbar>
      <HomeMain></HomeMain>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: #18191a;
  min-height: 100vh;
`;
