/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NEW_COMMENT } from "../helpers/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_POST_COMMENTS } from "../helpers/queries";
import { Link } from "react-router-dom";
import { timeDifference } from "../helpers/time-difference";

export default function SinglePostCommentContainer() {
  // HOOKS
  const [content, setContent] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const [isActive, activate] = useState(false);
  const [comments, setComments] = useState(null);

  // MUTATIONS && QUERIES

  const { data, loading, error } = useQuery(GET_POST_COMMENTS, {
    variables: {
      input: id,
    },
  });
  const [createComment] = useMutation(NEW_COMMENT, {
    update(cache, { data: { createComment } }) {
      const data = cache.readQuery({
        query: GET_POST_COMMENTS,
        variables: {
          input: id,
        },
      });
      console.log(data);
      cache.writeQuery({
        query: GET_POST_COMMENTS,
        variables: {
          input: id,
        },
        data: {
          results: [createComment, ...data.results],
        },
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
      variables: {
        input: {
          content: formData.content,
          _id: id,
        },
      },
    }).then((res) => {
      setComments(res);
    });
    setContent("");
  };

  const timer = timeDifference(Date.now(), createdAt);

  // ERROR HANDLING
  if (error) console.log(error);
  if (loading) return "Loading...";

  return <MainContainers></MainContainers>;
}

const MainContainer = styled.div``;
