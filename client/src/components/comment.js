/** @format */

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { timeDifference } from "../helpers/time-difference";

export default function Comment({ comment }) {
  const timer = timeDifference(Date.now(), comment.createdAt);
  return (
    <MainContainer>
      <CommentLogo>
        <img src={`${comment.author.avatar}`}></img>
      </CommentLogo>
      <CommentSection>
        <div>
          <Link to={`${comment.author._id}`}>{comment.author.username}</Link>
          <span>{comment.content}</span>
        </div>
        <div>
          <Timer>{timer.replace("hours ago", "h")}</Timer>
        </div>
      </CommentSection>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  padding: 15px 15px;
`;

const CommentLogo = styled.div`
  margin-right: 10px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: whitesmoke;
    font-weight: 600;
    margin-right: 4px;
    word-wrap: break-word;
  }

  span {
    word-wrap: break-word;
    color: whitesmoke;
  }
`;

const Timer = styled.time`
  font-size: 10px;
  letter-spacing: 0.2px;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 4px;
  color: whitesmoke;
`;
