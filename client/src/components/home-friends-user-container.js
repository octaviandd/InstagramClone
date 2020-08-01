/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FOLLOW_USER } from "../helpers/mutations";
import { useMutation } from "@apollo/client";
import profileImg from "../assets/profileimg.jpg";

export default function UserContainer({ user }) {
  //HOOKS
  const [isFollowing, follow] = useState(false);

  // MUTATIONS && QUERIES
  const [followUser, { data, error, loading }] = useMutation(FOLLOW_USER);

  // COMPONENT METHODS
  const onButtonClick = () => {
    follow(true);
    followUser({ variables: { input: user._id } }).then((res) =>
      console.log(res)
    );
  };

  // ERROR HANDLING
  if (loading) return "Loading...";
  if (error) return error;

  return (
    <MainContainer active={isFollowing}>
      <div>
        <div>
          <Link to={`/profile/${user._id}`}>
            <img src={profileImg}></img>
          </Link>
          <Link to={`/profile/${user._id}`}>{user.username}</Link>
        </div>
        <button onClick={() => onButtonClick()}>
          {isFollowing ? `Following` : `Follow`}
        </button>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  div {
    button {
      position: relative;
      border: none;
      color: #0095f6;
      background-color: inherit;
      font-weight: bold;
      font-size: 12px;
      cursor: pointer;
    }

    div {
      a {
        text-decoration: none;
        font-size: 14px;
        line-height: 18px;
        font-size: 14px;
        font-weight: bold;
        color: black;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      img {
        margin-right: 7.5px;
      }
    }
  }
`;
