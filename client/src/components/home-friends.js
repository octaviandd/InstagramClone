/** @format */

import React from "react";
import styled from "styled-components";
import profileImg from "../assets/profileimg.jpg";
import { FaGithub } from "react-icons/fa";
import { GET_CURRENT_USER, GET_USERS } from "../helpers/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import UserContainer from "./home-friends-user-container";

export default function HomeFriends() {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  const { data: data3 } = useQuery(GET_USERS);

  console.log(data3);

  if (error) return error;
  if (loading) return "Loading...";

  const { id, username } = data.getMe;

  return (
    <MainContainer>
      <Profile>
        <Link to={`/profile/${id}`}>
          <img src={profileImg}></img>
        </Link>
        <Link to={`/profile/${id}`}>
          <span>{username}</span>
        </Link>
      </Profile>
      <Suggestions>
        <div>
          <p>Suggestions For You</p>
          <a href="#">See all</a>
        </div>
        {data3 &&
          data3.getUsers
            .filter((user) => user.id !== id)
            .map((user) => {
              return (
                <UserContainer key={user.id} user={user} currentUserId={id} />
              );
            })}
      </Suggestions>
      <Watermark>
        <p>Made by Octavian David</p>
        <a href="http://github.com/octaviandd">
          <FaGithub />
        </a>
      </Watermark>
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
const Watermark = styled.div`
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
