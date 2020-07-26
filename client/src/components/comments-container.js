/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NEW_COMMENT } from "../helpers/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_POST_COMMENTS } from "../helpers/queries";

export default function CommentsContainer({ id }) {
  const [
    createComment,
    { data: data2, loading: loading2, error: error2 },
  ] = useMutation(NEW_COMMENT);
  console.log(id);
  const [content, setContent] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const [isActive, activate] = useState(false);
  const [comments, setComments] = useState(null);
  const { data, error, loading } = useQuery(GET_POST_COMMENTS, {
    variables: id,
  });

  console.log(data);

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

  const onSubmit = (formData) => {
    console.log(formData);
    createComment({
      variables: { input: { content: formData.content, id: id } },
    }).then((res) => {
      setComments(res);
      console.log(comments);
    });
    setContent("");
  };

  // if (error2 || error) return error;
  if (loading) return "Loading..";

  return (
    <>
      <MainContainer>
        <div>
          <div>
            <a href="#">octaviandd</a>
          </div>
          {/* {comments &&
            comments.map((comment) => {
              return (
                <div>
                  <a href="">test</a>
                  <span>{comment.content}</span>
                </div>
              );
            })} */}
        </div>
        <AddCommentsContainer active={isActive}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="content"
              onChange={(e) => handleInput(e)}
              value={content}
              ref={register({ required: true, minlength: 1 })}
            />
            <span>Add a comment..</span>
            <button type="submit">Post</button>
          </form>
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
  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

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
