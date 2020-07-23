/** @format */
import React, { useState } from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import { NEW_POST } from "../helpers/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

export default function HomeNewPost({ userID }) {
  const [isActive, setActive] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [createPost, { data, error, loading }] = useMutation(NEW_POST);

  const onSubmit = (formData) => {
    console.log(formData);
    setActive(!isActive);
  };

  return (
    <MainContainer>
      <button onClick={() => setActive(!isActive)}>
        <i className="fas fa-plus-circle"></i>
      </button>
      {isActive && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader
            name="image"
            withIcon={true}
            buttonText="Choose images"
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            ref={register}
          />
          <textarea
            rows="5"
            cols="33"
            name="comment"
            ref={register({ required: true, minLength: 6 })}
          />
          <button type="submit">Submit</button>
          <span onClick={() => setActive(!isActive)}>
            <i className="fas fa-times"></i>
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

    i {
      font-size: 30px;
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
      i {
        font-size: 18px;
      }
    }
  }
`;
