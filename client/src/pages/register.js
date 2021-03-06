/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { setAccessToken } from "../helpers/token";
import { NEW_USER } from "../helpers/mutations";
import Spinner from "../components/spinner";
import { ErrorBox } from "../components/error-box";

import { onError } from "@apollo/client/link/error";

export default function Register({ history }) {
  //HOOKS
  const [isActive, activate] = useState(false);
  const [value, setValue] = useState("");

  // MUTATIONS AND QUERIES
  const { register, handleSubmit, errors } = useForm();
  const [registerUser, { data, loading, error }] = useMutation(NEW_USER);

  useEffect(() => {
    if (value !== "") {
      activate(true);
    } else {
      activate(false);
    }
  }, [value]);

  // COMPONENT METHODS

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = async (formData) => {
    try {
      await registerUser({
        variables: {
          input: {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        },
      }).then((res) => {
        console.log(res);
        setAccessToken(res.data.createUser.token);
        if (res) {
          history.push("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ERROR HANDLING
  if (loading) return <Spinner />;

  return (
    <MainContainer>
      <Container active={isActive}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Instagram</h1>
            <h4>Sign up to see photos and videos from your friends.</h4>
            <div>
              <label>
                <input
                  name="email"
                  type="email"
                  onChange={(e) => handleInput(e)}
                  ref={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                ></input>
                <span className="text-legend">Email</span>
                {errors.email && <span>Invalid Email</span>}
                {error && <span>Email already in use.</span>}
              </label>
            </div>
            <div>
              <label>
                <input
                  name="name"
                  type="text"
                  onChange={(e) => handleInput(e)}
                  ref={register({ required: true })}
                ></input>
                <span className="text-legend">Full Name</span>
                {errors.fullName && <span>Invalid Name</span>}
              </label>
            </div>
            <div>
              <label>
                <input
                  name="username"
                  type="text"
                  onChange={(e) => handleInput(e)}
                  ref={register({ required: true, minLength: 6 })}
                ></input>
                <span className="text-legend">Username</span>
                {errors.username && <span>Invalid Username</span>}
              </label>
            </div>
            <div>
              <label>
                <input
                  name="password"
                  type="password"
                  onChange={(e) => handleInput(e)}
                  ref={register({
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/,
                  })}
                ></input>
                {errors.password && <span>Invalid password</span>}
                <span className="text-legend">Password</span>
              </label>
            </div>
            <div>
              <input type="submit" value="Next"></input>
            </div>
            <div>
              <p>
                By signing up, you agree to our Terms . Learn how we collect,
                use and share your data in our Data Policy and how we use
                cookies and similar technology in our Cookies Policy .
              </p>
            </div>
          </form>
          <Redirect>
            <p>
              Have an account?<Link to="/login">Log In</Link>
            </p>
          </Redirect>
        </div>
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: #18191a;
  width: 100%;
  min-height: 100vh;
  positon: relative;
`;

const Redirect = styled.div`
  background: #242526;
  margin-top: 0.5rem;
  display: flex;
  padding: 2rem 5rem;
  justify-content: center;
  color: whitesmoke;
  border-radius: 20px;

  a {
    text-decoration: none;
    color: #0095f6;
    margin-left: 4px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 618px;
  max-width: 350px;
  width: 100%;
  flex-shrink: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > div:nth-of-type(1) {
    border-radius: 20px;
    -webkit-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
    -moz-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
    box-shadow: 2px 1px 12px -6px rgba(32, 29, 30, 0.2);
  }

  div {
    width: 100%;
    background: #242526;
  }

  form {
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    h1 {
      font-size: 40px;
      margin-bottom: 2rem;
      color: whitesmoke;
    }
    h4 {
      text-align: center;
      margin-bottom: 0.525rem;
      color: #8e8e8e;
      padding-bottom: 1.6rem;
    }

    div {
      position: relative;
      border: none;
      cursor: auto;
      margin-bottom: 0.425rem;
      width: 100%;

      label {
        cursor: auto;
        padding: 15px 0px;
      }
      .text-legend {
        position: absolute;
        font-size: 14px;
        height: 40px;
        color: #909090;
        line-height: 40px;
        right: 0;
        left: 8px;
        top: 0;
        cursor: auto;
        transition: all 0.3s ease-in-out;
        ${({ active }) =>
          active &&
          `
              left: 6px;
              font-size: 10px;
              top: 0;
              line-height: 16px;
            `}
      }
      input {
        height: 40px;
        padding-left: 8px;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
        border: 1px solid #dbdbdb;
        background-color: #fafafa;
        border-radius: 3px;
        cursor: auto;
        font-size: 12px;

        &:focus {
          font-size: 12px;
          outline: #a2a2a2;
          padding-top: 6px;
          padding-bottom: 5px;
          border: 1px solid #a2a2a2;
        }
      }
    }
    div:nth-of-type(5) {
      margin-top: 0;
      input {
        background-color: #c609ec;
        font-size: 14px;
        color: #fff;
        font-weight: 600;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    div:nth-of-type(6) {
      margin-top: 0.425rem;
      p {
        text-align: center;
        color: #909090;
        font-size: 12px;
      }
    }
  }
`;
