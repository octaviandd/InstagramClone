/** @format */

import React from "react";
import styled from "styled-components";
import { GET_POST } from "../helpers/queries";
import { useQuery } from "@apollo/client";
import { timeDifference } from "../helpers/time-difference";

export default function Post({
  match: {
    params: { id },
  },
}) {
  const { data, loading } = useQuery(GET_POST, { variables: { input: id } });

  if (loading) return "Loading...";
  console.log(data);
  const timer = timeDifference(Date.now(), data.results.createdAt);

  return (
    <MainContainer>
      <PostModal>
        <LeftRow>
          <img src={`${data && data.results.picture}`}></img>
        </LeftRow>
        <RightRow>
          <Topbar>
            <img src={`${data && data.results.author.avatar}`}></img>
            <p>{data && data.results.author.username}</p>
          </Topbar>
          <PostDescription>
            <div>
              <img src={`${data && data.results.author.avatar}`}></img>
              <span>{data && data.results.author.username}</span>
              <p>{data && data.results.description}</p>
            </div>
            <time>{timer}</time>
          </PostDescription>
          <CommentsList>
            {data.results.comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <img src={`${comment.author.avatar}`}></img>
                  <span>{comment.author.username}</span>
                </div>
              );
            })}
          </CommentsList>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div></div>
          <div></div>
        </RightRow>
      </PostModal>
    </MainContainer>
  );
}

const MainContainer = styled.div``;

const PostModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

const RightRow = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 300px;
  background-color: #ffffff;
`;

const LeftRow = styled.div`
  img {
    height: 600px;
    width: 600px;
    object-fit: contain;
  }
`;

const Topbar = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  padding: 15px 15px;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    margin-right: 12.5px;
    margin-left: 10px;
  }
`;

const CommentsList = styled.div`
  div {
    display: flex;
    width: 100%;
    padding: 15px 15px;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      margin-right: 12.5px;
      margin-left: 10px;
    }
  }
`;

const PostDescription = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 15px;
  flex-direction: column;

  div {
    align-items: center;
    display: flex;

    p {
      margin-left: 10px;
    }

    img {
      width: 32px;
      height: 32px;
    }
  }
`;
