/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NEW_COMMENT } from "../helpers/mutations";
import { useMutation } from "@apollo/client";

export default function CommentsContainer({ id }) {
  const [createComment, { data, loading, error }] = useMutation(NEW_COMMENT);
  const [content, setContent] = useState("");
  const [isActive, activate] = useState(false);

  const handleInput = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (content !== "") {
      activate(true);
    } else {
      activate(false);
    }
  }, [content]);

  return (
    <>
      <MainContainer>
        <div>
          <div>
            <a href="#">octaviandd</a>
          </div>
          <div>
            <a href="#">George Soros</a> Great, nice.
          </div>
          <div>
            <a href="#">Bill Gates</a> Nice,man.
          </div>
        </div>
        <AddCommentsContainer active={isActive}>
          <input type="text" onChange={(e) => handleInput(e)} value={content} />
          <span>Add a comment..</span>
          <button>Post</button>
        </AddCommentsContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  padding-left: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    margin-bottom: 7.5px;
    font-size: 14px;
    line-height: 18px;
    a {
      font-weight: 800;
      text-decoration: none;
      color: #363636;
    }
  }
`;

const AddCommentsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
  width: 100%;
  padding: 15px 10px;

  input {
    border: none;
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }

  span {
    left: 12.5px;
    position: absolute;
    color: #dbdbdb;
    font-size: 14px;
    line-height: 18px;
    pointer-events: none;
    ${({ active }) =>
      active &&
      `
        display: none;
      `}
  }

  button {
    font-size: 16px;
    background-color: transparent;
    color: #b1defc;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
`;
