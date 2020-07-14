/** @format */

import React from "react";
import styled from "styled-components";
import image from "../assets/loginpage.png";
import carousel1 from "../assets/carousel1.jpg";
import carousel2 from "../assets/carousel2.jpg";
import carousel3 from "../assets/carousel3.jpg";
import carousel4 from "../assets/carousel4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

export default function Login() {
  return (
    <MainContainer>
      <MainContainerColOne>
        <div id="background"></div>
        <div id="carousel">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            updateOnWindowResize={true}
            roundLengths={true}
            autoplay={(true, { delay: 3000, disableOnInteraction: false })}
            lazy={true}
            fadeEffect={(true, { crossFade: true })}
            effect="slide"
          >
            <SwiperSlide>
              <img
                src={carousel1}
                alt="carousel1"
                width="300"
                height="426"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={carousel2}
                alt="carousel2"
                width="300"
                height="426"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={carousel3}
                alt="carousel3"
                width="300"
                height="426"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={carousel4}
                alt="carousel4"
                width="300"
                height="426"
              ></img>
            </SwiperSlide>
          </Swiper>
        </div>
      </MainContainerColOne>
      <MainContainerColTwo>
        <div>
          <form>
            <h1>Instagram</h1>
            <div>
              <label>
                <span>Phone number, username or e-mail</span>
                <input type="email" id="nameInput" />
              </label>
            </div>
            <div>
              <label>
                <span>Password</span>
                <input type="password" id="passwordInput" />
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
            Don't have an account? <a>Sign up</a>
          </p>
        </div>
        <div>
          <p>Made by Octavian David</p>
          <a href="http://github.com/octaviandd">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </MainContainerColTwo>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: #fafafa;
  padding: 5rem 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-auto-rows: 1fr;
  width: 100%;
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

  div {
    background-color: white;
    width: 100%;
  }

  div:nth-of-type(1) {
    border: 1px solid #dbdbdb;
    margin-bottom: 0.3rem;
    form {
      h1 {
        font-size: 40px;
        margin-bottom: 2rem;
      }

      padding: 2rem 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        position: relative;
        border: none;
        cursor: auto;

        label {
          cursor: auto;
          padding: 15px 0px;
        }
        span {
          position: absolute;
          font-size: 14px;
          height: 40px;
          color: #a2a2a2;
          line-height: 40px;
          right: 0;
          left: 8px;
          cursor: auto;
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
          font-size: 16px;

          &:focus {
            outline: #a2a2a2;
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
          background-color: #b2dffc;
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
          margin-right: 1rem;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: bold;
          color: #a2a2a2;
        }
        span:nth-of-type(1),
        span:nth-of-type(3) {
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
    border: 1px solid #dbdbdb;
    margin-bottom: 0.3rem;
    p {
      padding: 20px 15px;
      text-align: center;
      font-weight: 400;

      a {
        text-decoration: none;
        color: #0095f6;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
  div:nth-of-type(3) {
    background-color: #fafafa;
    display: flex;
    margin-top: 3rem;
    flex-direction: column;
    align-items: center;
    p {
      text-align: center;
    }
    a {
      margin-top: 1rem;
      color: black;
      font-size: 20px;
    }
  }
`;
