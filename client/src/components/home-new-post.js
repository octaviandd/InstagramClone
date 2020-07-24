/** @format */
import React, { useState } from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import { NEW_POST, S3_NEWSIGN } from "../helpers/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";

export default function HomeNewPost({ userID }) {
  const [isActive, setActive] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [createPost, { data, error, loading }] = useMutation(NEW_POST);
  const [pictures, addPicture] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const onSubmit = (formData) => {
    console.log(formData);
    setActive(!isActive);
    // needs adjustment
    createPost({
      variables: {
        input: {
          content: formData.description,
        },
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };

  const submit = async () => {
    const response = await this.props.s3Sign({
      variables: {
        filename: formatFilename(file.name),
        filetype: file.type,
      },
    });
    const { signedRequest, url } = response.data.signS3;
    await uploadToS3(file, signedRequest);

    const graphqlResponse = await this.props.createChampion({
      variables: {
        name,
        pictureUrl: url,
      },
    });
  };

  const formatFilename = (filename) => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
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
            onChange={addPicture}
            buttonText="Choose images"
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            ref={register}
          />
          <textarea
            rows="5"
            cols="33"
            name="description"
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
