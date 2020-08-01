/** @format */

import React from "react";
import styled from "styled-components";
import profileImg from "../assets/profileimg.jpg";
import { GET_CURRENT_USER, GET_USERS } from "../helpers/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import UserContainer from "./home-friends-user-container";
import Watermark from "../components/watermark";

export default function HomeFriends() {
  // MUTATIONS && QUERIES
  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  const { data: data1 } = useQuery(GET_USERS);

  // ERROR HANDLING
  if (error) return error;
  if (loading) return "Loading...";

  // DESCTRUCTURING
  const { _id, username, following } = data.results;

  return (
    <MainContainer>
      <Profile>
        <Link to={`/profile/${_id}`}>
          <img src={profileImg}></img>
        </Link>
        <Link to={`/profile/${_id}`}>
          <span>{username}</span>
        </Link>
      </Profile>
      <Suggestions>
        <div>
          <p>Suggestions For You</p>
          <a href="#">See all</a>
        </div>
        {data1 &&
          data1.results
            .filter(
              (user) =>
                user._id !== _id &&
                !following.find(({ _id }) => user._id === _id)
            )
            .slice(0, 5)
            .map((user) => {
              return (
                <UserContainer key={user._id} user={user} currentUserId={_id} />
              );
            })}
      </Suggestions>
      <Watermark />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 293px;
`;

const Suggestions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 3.5px;
    margin-bottom: 3.5px;
  }

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 14px;
      line-height: 18px;
      color: #8f8f8f;
      font-weight: bold;
    }
    a {
      font-size: 14px;
      line-height: 18px;
      text-decoration: none;
      color: black;
      font-weight: bold;
    }
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding-top: 2rem;
  img {
    margin-right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  a {
    text-decoration: none;
    color: #262626;
    font-weight: bold;
  }
`;
