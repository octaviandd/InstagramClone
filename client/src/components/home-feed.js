/** @format */

import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../helpers/queries";
import PostContainer from "../components/post-container";

function compare(a, b) {
  const timeA = a.createdAt.toUpperCase();
  const timeB = b.createdAt.toUpperCase();

  let comparison = 0;
  if (timeA > timeB) {
    comparison = -1;
  } else if (timeA < timeB) {
    comparison = 1;
  }
  return comparison;
}

export default function HomeFeed() {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  if (error) return error;
  if (loading) return "Loading..";

  const postsArray = data.getAllPosts;

  const newArr = postsArray.slice();
  newArr.sort(compare);

  return (
    <MainContainer>
      {newArr &&
        newArr.map((post) => {
          return <PostContainer key={post.id} post={post && post} />;
        })}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 75px;
`;
