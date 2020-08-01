/** @format */

import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_CURRENT_USER } from "../helpers/queries";
import PostContainer from "../components/post-container";

// Method for object comparison by timeline (createdAt)
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
//

export default function HomeFeed() {
  // HOOKS

  const { data, error, loading } = useQuery(GET_ALL_POSTS);
  const { data: data2, error: error2, loading: loading2 } = useQuery(
    GET_CURRENT_USER
  );

  // ERROR HANDLING
  if (error) return error;
  if (loading) return "Loading..";

  //DESTRUCTURING
  const { following } = data2.results;
  const postsArray = data.results;

  const newArr = postsArray.slice();
  newArr.sort(compare);

  return (
    <MainContainer>
      {newArr &&
        newArr
          .filter((user) =>
            following.find(({ _id }) => user.author._id === _id)
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
