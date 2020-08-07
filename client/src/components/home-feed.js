/** @format */

import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_CURRENT_USER } from "../helpers/queries";
import PostContainer from "../components/post-container";
import Spinner from "../components/spinner";
import { compare } from "../helpers/post-order";

export default function HomeFeed() {
  // HOOKS

  const { data, error, loading } = useQuery(GET_ALL_POSTS);
  const { data: data2 } = useQuery(GET_CURRENT_USER);

  // ERROR HANDLING
  if (error) return error;
  if (loading) return <Spinner />;

  //DESTRUCTURING
  const { following, _id: currentUserID } = data2.results;
  const postsArray = data.results;

  const newArr = postsArray.slice();
  newArr.sort(compare);

  return (
    <MainContainer>
      {newArr &&
        newArr
          .filter(
            (user) =>
              following.find(({ _id }) => user.author._id === _id) ||
              user._id !== currentUserID
          )
          .map((post) => {
            return <PostContainer key={post._id} post={post && post} />;
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
