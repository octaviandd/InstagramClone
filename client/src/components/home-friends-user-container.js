/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FOLLOW_USER } from "../helpers/mutations";
import { GET_CURRENT_USER } from "../helpers/queries";
import { useMutation } from "@apollo/client";

export default function UserContainer({ user }) {
  //HOOKS
  const [isFollowing, follow] = useState(false);

  // MUTATIONS && QUERIES
  const [followUser, { error, loading }] = useMutation(FOLLOW_USER, {
    update(cache, { data: { followUser } }) {
      const data = cache.readQuery({ query: GET_CURRENT_USER });
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          results: { following: [followUser, ...data.results.following] },
        },
      });
    },
  });

  // COMPONENT METHODS
  const onButtonClick = () => {
    follow(true);
    followUser({ variables: { input: user._id } });
  };

  // ERROR HANDLING
  if (loading) return "Loading...";
  if (error) return error;

  return (
    <MainContainer active={isFollowing}>
      <div>
        <div>
          <Link to={`/profile/${user._id}`}>
            <img src={user.avatar} alt={`${user.username} avatar`}></img>
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
        color: #e5e7ec;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      img {
        margin-right: 7.5px;
      }
    }
  }
`;
