/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image from "../assets/loginpage.png";
import Carousel from "../components/carousel";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LOGIN_USER } from "../helpers/mutations";
import { useMutation } from "@apollo/client";
import { setAccessToken } from "../helpers/token";
import { FaTimes, FaGithub } from "react-icons/fa";
import Spinner from "../components/spinner";

export default function Login({ history }) {
  // HOOKS
  const [isActive, activate] = useState(false);
  const [value, setValue] = useState("");
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // MUTATIONS && QUERIES

  const { register, handleSubmit, errors } = useForm();
  const [logUser, { data, loading, error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (value !== "") {
      activate(true);
    } else {
      activate(false);
    }
  }, [value]);

  // COMPONENT METHODS
  const onSubmit = (formData) => {
    logUser({
      variables: {
        input: {
          email: formData.email,
          password: formData.password,
        },
      },
    }).then((res) => {
      setAccessToken(res.data.loginUser.token);
      if (res) {
        history.push("/");
      }
    });
  };

  // ERROR HANDLING
  if (loading) return <Spinner />;
  if (error) return error;

  return (
    <MainContainer>
      <MainContainerColOne>
        <div id="background"></div>
        <div id="carousel">
          <Carousel></Carousel>
        </div>
      </MainContainerColOne>
      <MainContainerColTwo active={isActive}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Instagram</h1>
            <div>
              <label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="email"
                  id="nameInput"
                  name="email"
                  ref={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                <span className="text-legend">Username or e-mail</span>
                {errors.email && (
                  <span className="error-icon">
                    <FaTimes />
                  </span>
                )}
              </label>
            </div>
            <div>
              <label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="password"
                  name="password"
                  id="passwordInput"
                  ref={register({ required: true, minLength: 6 })}
                />
                <span className="text-legend">Password</span>
                {errors.username && (
                  <span className="error-icon">
                    <FaTimes />
                  </span>
                )}
              </label>
            </div>
            <div>
              <input type="submit" value="Log In" />
            </div>
            <div>
              <span></span>
              <span>Or</span>
              <span></span>
            </div>
            <div>
              <a href="#">Forgot Password?</a>
            </div>
          </form>
        </div>
        <div>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
        <div>
          <p>Made by Octavian David</p>
          <a href="http://github.com/octaviandd">
            <FaGithub />
          </a>
        </div>
      </MainContainerColTwo>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: #18191a;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-auto-rows: 1fr;
  width: 100%;
  flex-shrink: 0;
  min-height: 100vh;
`;

const MainContainerColOne = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-shrink: 0;
  align-self: center;
  align-items: stretch;
  flex-direction: column;
  flex-basis: 454px;
  position: relative;

  #carousel {
    position: absolute;
    width: 240px;
    overflow: hidden;
    top: 100px;
    right: 63px;
  }

  #background {
    background-image: url(${image});
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 454px 618px;
    width: 100%;
    height: 618px;
  }

  @media (max-width: 875px) {
    display: none;
  }
`;

const MainContainerColTwo = styled.div`
  display: flex;
  flex-direction: column;
  height: 618px;
  max-width: 350px;
  width: 100%;
  flex-shrink: 0;
  -webkit-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  -moz-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  border-radius: 20px;
  background: #242526;

  div {
    background: #242526;
    width: 100%;
  }

  div:nth-of-type(1) {
    margin-bottom: 0.3rem;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    form {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      padding: 2rem 2.5rem;
      display: flex;
      border: 0;
      flex-direction: column;
      align-items: center;
      h1 {
        font-size: 40px;
        margin-bottom: 2rem;
        color: whitesmoke;
      }
      div {
        position: relative;
        border: none;
        cursor: auto;

        label {
          cursor: auto;
          padding: 15px 0px;
        }
        .text-legend {
          position: absolute;
          font-size: 14px;
          height: 40px;
          color: #a2a2a2;
          line-height: 40px;
          right: 0;
          left: 8px;
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

        .error-icon {
          position: absolute;
          border: 1px solid black;
          border-radius: 50%;
          right: 20px;
          top: 10px;
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
      div:nth-of-type(2) {
        margin-bottom: 1rem;
      }
      div:nth-of-type(3) {
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
      div:nth-of-type(4) {
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        align-items: center;
        justify-content: center;
        span {
          display: inline-block;
          position: static;
        }
        span:nth-of-type(2) {
          margin-left: 1rem;
          position: static;
          margin-right: 1rem;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: bold;
          color: #a2a2a2;
        }
        span:nth-of-type(1),
        span:nth-of-type(3) {
          position: static;
          width: 100px;
          height: 1px;
          background-color: #dbdbdb;
        }
      }
      div:nth-of-type(5) {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        a {
          text-align: center;
          text-decoration: none;
          font-size: 13.5px;
          letter-spacing: 0.2px;
          color: #3f5789;
          line-height: 14px;
        }
      }
    }
  }

  div:nth-of-type(2) {
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    margin-bottom: 0.3rem;
    p {
      padding: 20px 15px;
      text-align: center;
      font-weight: 400;
      color: whitesmoke;
      a {
        text-decoration: none;
        color: #0095f6;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
  div:nth-of-type(3) {
    background: #242526;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    display: flex;
    padding-top: 3rem;
    padding-bottom: 1rem;
    flex-direction: column;
    align-items: center;
    p {
      text-align: center;
      color: whitesmoke;
    }
    a {
      margin-top: 1rem;
      color: whitesmoke;
      font-size: 20px;
    }
  }
`;
