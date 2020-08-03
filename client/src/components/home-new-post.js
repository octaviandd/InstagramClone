/** @format */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { NEW_POST, SINGLE_UPLOAD, NEW_USER } from "../helpers/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { GET_ALL_POSTS } from "../helpers/queries";

export default function HomeNewPost() {
  // HOOKS
  const [isActive, setActive] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [picture, addPicture] = useState("");

  // MUTATIONS && QUERIES
  const [createPost] = useMutation(NEW_POST, {
    update(cache, { data: { createPost } }) {
      const data = cache.readQuery({ query: GET_ALL_POSTS });
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { results: [createPost, ...data.results] },
      });
    },
  });
  const [uploadPicture, { data, error, loading }] = useMutation(SINGLE_UPLOAD);

  // COMPONENT METHODS
  const onDrop = useCallback(
    ([file]) => {
      uploadPicture({ variables: { file } }).then((res) => {
        addPicture(res.data.singleUpload.uri);
      });
    },
    [uploadPicture]
  );

  const onSubmit = async (formData) => {
    createPost({
      variables: {
        input: {
          description: formData.description,
          picture: picture,
        },
      },
    });
    setActive(!isActive);
  };

  // DESTRUCTURING
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // ERROR HANDLING
  if (error) return error;
  if (loading) return "Loading..";

  return (
    <MainContainer>
      <button onClick={() => setActive(!isActive)}>
        <FaPlusCircle />
      </button>
      {isActive && (
        <form onSubmit={handleSubmit(onSubmit)} encType={"multipart/form-data"}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          <textarea
            rows="5"
            cols="33"
            name="description"
            ref={register({ required: true, minLength: 6 })}
          />
          <button type="submit">Submit</button>
          <span onClick={() => setActive(!isActive)}>
            <FaTimes />
          </span>
        </form>
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  align-items: center;

  button {
    background: transparent;
    border: none;
    cursor: pointer;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  form {
    position: fixed;
    padding: 1rem 2rem;
    flex-direction: column;
    display: flex;
    align-items: center;
    background-color: #fff;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 540px;
    z-index: 99999;
    border-radius: 10px;
    border: 1px solid #8e8e8e;

    textarea {
      padding: 10px 5px;
      border-radius: 5px;
      border: 1px solid black;

      &:focus {
        outline: none;
      }
    }

    button {
      color: #b2dffc;
      border: 2px solid #b2dffc;
      padding: 10px 17.5px;
      border-radius: 5px;
      font-size: 18px;
      max-width: 120px;
      width: 100%;
      font-weight: bold;
      margin-top: 2rem;
      line-height: 18px;
    }
    span {
      position: absolute;
      right: 15px;
      top: 10px;
      cursor: pointer;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;
