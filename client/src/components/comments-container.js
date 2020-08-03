/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NEW_COMMENT } from "../helpers/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_POST_COMMENTS } from "../helpers/queries";
import { Link } from "react-router-dom";

export default function CommentsContainer({
  id,
  username,
  author,
  description,
}) {
  // HOOKS
  const [content, setContent] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const [isActive, activate] = useState(false);
  const [comments, setComments] = useState(null);

  // MUTATIONS && QUERIES

  const { data, loading, error } = useQuery(GET_POST_COMMENTS, {
    variables: { input: id },
  });
  const [createComment] = useMutation(NEW_COMMENT, {
    update(cache, { data: { createComment } }) {
      const data = cache.readQuery({
        query: GET_POST_COMMENTS,
        variables: { input: id },
      });
      console.log(data);
      cache.writeQuery({
        query: GET_POST_COMMENTS,
        variables: { input: id },
        data: { results: [createComment, ...data.results] },
      });
    },
  });

  // COMPONENT METHODS

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
    createComment({
      variables: { input: { content: formData.content, _id: id } },
    }).then((res) => {
      setComments(res);
    });
    setContent("");
  };

  // ERROR HANDLING
  if (error) console.log(error);
  if (loading) return "Loading...";

  return (
    <>
      <MainContainer>
        <div>
          <div>
            <Link to={`/profile/${author}`}>{username}</Link>
            <span>{description}</span>
          </div>
          {data &&
            data.results.map((comment) => {
              return (
                <Comments key={comment._id}>
                  <div>
                    <Link to={`/profile/${comment.author._id}`}>
                      <span>{comment.author.username}</span>
                    </Link>
                    <span>{comment.content}</span>
                  </div>
                  <div>
                    <button type="button">
                      <div>
                        <svg
                          aria-label="Like"
                          fill="#8e8e8e"
                          height="12"
                          viewBox="0 0 48 48"
                          width="12"
                        >
                          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </Comments>
              );
            })}
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
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div:nth-of-type(1) {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 7.5px;
    font-size: 14px;
    line-height: 18px;

    a {
      font-weight: 800;
      text-decoration: none;
      color: #363636;
      margin-right: 6px;
    }
  }
`;

const AddCommentsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
  width: 100%;

  form {
    padding: 15px 10px;
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

const Comments = styled.div`
  display: flex;
  justify-content: space-between;

  & > div:nth-of-type(1) {
    a {
      margin-right: 6px;
    }
  }

  & > div:nth-of-type(2) {
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    margin-right: 15px;
  }
`;
