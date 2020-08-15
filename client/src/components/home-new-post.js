/** @format */
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { NEW_POST, SINGLE_UPLOAD } from "../helpers/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { GET_ALL_POSTS } from "../helpers/queries";
import { FcPicture } from "react-icons/fc";

export default function HomeNewPost() {
  // HOOKSgit
  const [isActive, setActive] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [picture, addPicture] = useState("");
  const [buttonStatus, enableButton] = useState(false);
  const [value, setValue] = useState("");

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

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const onDrop = useCallback(
    ([file]) => {
      uploadPicture({
        variables: { file },
        optimisticResponse: {
          __typename: "Mutations",
          singleUpload: {
            __typename: "File",
            filename: "astring",
            mimetype: "astring",
            encoding: "astring",
            uri: "astring",
          },
        },
      }).then((res) => {
        addPicture(res.data.singleUpload.uri);
      });
    },
    [uploadPicture]
  );

  const onSubmit = async (formData) => {
    await createPost({
      variables: {
        input: {
          description: formData.description || " ",
          picture: picture,
        },
      },
    });
    setActive(!isActive);
    addPicture("");
  };

  // DESTRUCTURING
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // ERROR HANDLING
  if (error) return error;

  return (
    <MainContainer>
      <button onClick={() => setActive(!isActive)}>
        <FaPlusCircle />
      </button>
      {isActive && (
        <FormModal
          onSubmit={handleSubmit(onSubmit)}
          encType={"multipart/form-data"}
        >
          <TopBar>
            <h2>Create Post</h2>
            <span onClick={() => setActive(!isActive)}>
              <FaTimes />
            </span>
          </TopBar>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <PictureInput>
              <FcPicture id="dropZone" />
              <span>Photo</span>
            </PictureInput>
          </div>
          <FormActions>
            <input
              autoComplete="off"
              placeholder="What's on your mind?"
              type="text"
              name="description"
              ref={register}
              id="textInput"
              onChange={(e) => handleInput(e)}
            />
            <button type="submit" disabled={picture ? false : true}>
              Post
            </button>
          </FormActions>
        </FormModal>
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
    color: #8f94fb;
    border: none;
    cursor: pointer;
    background-color: transparent;

    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const FormModal = styled.form`
  position: fixed;
  padding: 1rem 0;
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: #242526;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 540px;
  z-index: 99999;
  border-radius: 10px;
  border: 1px solid #242526;

  #dropZone {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;

const TopBar = styled.div`
  display: grid;
  border-bottom: 1px solid #e5e7ec;
  width: 100%;
  position: relative;
  padding: 1rem;

  h2 {
    color: #e5e7ec;
    text-align: center;
    padding-bottom: 1rem;
  }

  span {
    color: #e5e7ec;
    text-align: center;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 20px;
    svg {
      width: 18px;
      height: 18px;
      fill: #e5e7ec;
    }
  }
`;

const FormActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    padding: 10px 5px;
    border-radius: 5px;
    border: 0;
    background-color: inherit;
    color: #e5e7ec;
    width: 100%;
    height: 400px;
    font-size: 30px;
    text-align: center;

    &:focus {
      outline: none;
    }

    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 30px;
      text-align: center;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      font-size: 30px;
      text-align: center;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      font-size: 30px;
      text-align: center;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      font-size: 30px;
      text-align: center;
    }
  }

  button {
    color: #838384;
    background: #3a3b3c;
    border: 0;
    padding: 10px 17.5px;
    border-radius: 10px;
    font-size: 18px;
    width: 90%;
    text-align: center;
    font-weight: bold;
    margin-top: 2rem;
    line-height: 18px;
    ${({ disabled }) => !disabled && `background: #8ea1e1;color: #e5e7ec;`}
  }
`;

const PictureInput = styled.div`
  display: flex;
  align-items: center;
  color: #838384;
  width: 100%;
  padding: 7.5px 12.5px;
  margin-top: 25px;
  svg {
    padding-right: 10px;
  }
  background-color: #3a3b3c;
  border-radius: 10px;
`;
