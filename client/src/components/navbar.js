/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GET_USERS, GET_CURRENT_USER } from "../helpers/queries";
import { useQuery } from "@apollo/client";
import SearchBar from "./search-bar";

export default function Navbar() {
  //HOOKS
  const [activeDropdown, activateDropdown] = useState(false);
  const [isSearchDropdownActive, setSearchDropdown] = useState(false);
  const [isActive, activate] = useState(false);
  const [value, setValue] = useState("");

  const { data: data1 } = useQuery(GET_CURRENT_USER);

  // MUTATIONS && QUERIES
  const { data, loading, error } = useQuery(GET_USERS);

  useEffect(() => {
    if (value !== "") {
      activate(true);
    } else {
      activate(false);
    }

    if (value.length > 1) {
      setSearchDropdown(true);
    } else {
      setSearchDropdown(false);
    }
  }, [value]);

  // COMPONENT METHODS
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const clearText = () => {
    setValue("");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  // ERROR HANDLINGG
  if (error) console.log(error);
  if (loading) return "Loading...";

  return (
    <MainContainer>
      <Container>
        <div>
          <h3>
            <Link to="/">InstagramClone</Link>
          </h3>
        </div>
        <SearchBar
          clearText={clearText}
          value={value}
          handleInput={handleInput}
          isSearchDropdownActive={isSearchDropdownActive}
          active={isActive}
        />
        <Icons>
          <div>
            <Link to="/">
              <svg fill="#fff" height="22" viewBox="0 0 48 48" width="22">
                <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
              </svg>
            </Link>
          </div>
          <div>
            <Link to="">
              <svg fill="#fff" height="22" viewBox="0 0 48 48" width="22">
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
            </Link>
          </div>
          <div>
            <Link to="">
              <svg fill="#fff" height="22" viewBox="0 0 48 48" width="22">
                <path
                  clipRule="evenodd"
                  d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <div>
            <Link to="">
              <svg
                aria-label="Activity Feed"
                height="22"
                viewBox="0 0 48 48"
                width="22"
                fill="#fff"
              >
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            </Link>
          </div>
          <div>
            <a onClick={() => activateDropdown(!activeDropdown)}>
              <span>
                <img src={`${data1.results.avatar}`} alt="profile-icon" />
              </span>
            </a>
          </div>
        </Icons>
        {activeDropdown && (
          <Dropdown>
            <ul>
              <li>
                <Link to={`/profile/${data1.results._id}`}>
                  <div>
                    <span>
                      <svg
                        aria-label="Profile"
                        fill="#262626"
                        height="16"
                        viewBox="0 0 32 32"
                        width="16"
                      >
                        <path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
                      </svg>
                    </span>
                    <span>Profile</span>
                  </div>
                </Link>
              </li>
              <li>
                <div>
                  <span>
                    <svg
                      aria-label="Settings"
                      fill="#262626"
                      height="16"
                      viewBox="0 0 32 32"
                      width="16"
                    >
                      <path d="M31.2 13.4l-1.4-.7c-.1 0-.2-.1-.2-.2v-.2c-.3-1.1-.7-2.1-1.3-3.1v-.1l-.2-.1v-.3l.5-1.5c.2-.5 0-1.1-.4-1.5l-1.9-1.9c-.4-.4-1-.5-1.5-.4l-1.5.5H23l-.1-.1h-.1c-1-.5-2-1-3.1-1.3h-.2c-.1 0-.1-.1-.2-.2L18.6.9c-.2-.5-.7-.9-1.2-.9h-2.7c-.5 0-1 .3-1.3.8l-.7 1.4c0 .1-.1.2-.2.2h-.2c-1.1.3-2.1.7-3.1 1.3h-.1l-.1.2h-.3l-1.5-.5c-.5-.2-1.1 0-1.5.4L3.8 5.7c-.4.4-.5 1-.4 1.5l.5 1.5v.5c-.5 1-1 2-1.3 3.1v.2c0 .1-.1.1-.2.2l-1.4.7c-.6.2-1 .7-1 1.2v2.7c0 .5.3 1 .8 1.3l1.4.7c.1 0 .2.1.2.2v.2c.3 1.1.7 2.1 1.3 3.1v.1l.2.1v.3l-.5 1.5c-.2.5 0 1.1.4 1.5l1.9 1.9c.3.3.6.4 1 .4.2 0 .3 0 .5-.1l1.5-.5H9l.1.1h.1c1 .5 2 1 3.1 1.3h.2c.1 0 .1.1.2.2l.7 1.4c.2.5.7.8 1.3.8h2.7c.5 0 1-.3 1.3-.8l.7-1.4c0-.1.1-.2.2-.2h.2c1.1-.3 2.1-.7 3.1-1.3h.1l.1-.1h.3l1.5.5c.1 0 .3.1.5.1.4 0 .7-.1 1-.4l1.9-1.9c.4-.4.5-1 .4-1.5l-.5-1.5V23l.1-.1v-.1c.5-1 1-2 1.3-3.1v-.2c0-.1.1-.1.2-.2l1.4-.7c.5-.2.8-.7.8-1.3v-2.7c0-.5-.4-1-.8-1.2zM16 27.1c-6.1 0-11.1-5-11.1-11.1S9.9 4.9 16 4.9s11.1 5 11.1 11.1-5 11.1-11.1 11.1z"></path>
                    </svg>
                  </span>
                  <span>Settings</span>
                </div>
              </li>
              <li>
                <button onClick={() => logOut()}>
                  <div>Log Out</div>
                </button>
              </li>
            </ul>
          </Dropdown>
        )}
        {isSearchDropdownActive && (
          <SearchDropDown>
            {data &&
              data.results
                .slice(0, 20)
                .filter((user) => user.username.includes(value))
                .map((user) => {
                  return (
                    <div key={user._id}>
                      <Link to={`/profile/${user._id}`}>
                        <div>
                          <img src={user.avatar} />
                        </div>
                        <div>
                          <p>{user.username}</p>
                          <p>{user.name}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
          </SearchDropDown>
        )}
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(32, 29, 30, 1) 35%,
    rgba(3, 25, 29, 1) 100%
  );
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  margin: 0;
  position: relative;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0rem;
  max-width: 975px;
  width: 100%;
  position: relative;
  align-items: center;

  & > div:nth-of-type(1) {
    h3 {
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
`;

const Icons = styled.div`
  display: flex;

  div {
    margin-left: 20px;

    a {
      cursor: pointer;
    }

    span {
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0px;
  top: 63px;
  background-color: white;
  max-width: 200px;
  width: 100%;
  z-index: 999;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px #dbdbdb;
  ul {
    li {
      list-style: none;
      display: flex;
      align-items: center;
      line-height: 50px;
      height: 50px;
      padding-left: 10px;
      &:hover {
        background-color: #dbdbdb;
      }

      a {
        text-decoration: none;
        color: black;
      }

      div {
        display: flex;
        align-items: center;
        /* margin-bottom: 17.5px; */
      }
      span {
        margin-right: 15px;
        font-weight: 400;
      }
    }

    > li:nth-of-type(3) {
      border-top: 1px solid #dbdbdb;
      padding-top: 12.5px;
      padding-bottom: 5px;

      button {
        background-color: transparent;
        border: none;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
`;

const SearchDropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 415px;
  top: 61px;
  max-width: 220px;
  width: 100%;
  background-color: white;
  border: 1px solid #dbdbdb;
  height: 362px;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  & > div {
    border-bottom: 1px solid #dbdbdb;
    padding: 8px 14px;
  }

  a {
    height: 50px;
    align-items: center;
    display: flex;
    text-decoration: none;
    color: black;

    & > div:nth-of-type(1) {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: contain;
        margin-right: 8px;
      }
    }

    & > div:nth-of-type(2) {
      & > p:nth-of-type(1) {
        font-weight: 600;
        line-height: 22px;
        font-size: 14px;
        text-overflow: ellipsis;
      }
      & > p:nth-of-type(2) {
        font-weight: 300;
        font-size: 14px;
        text-align: left;
        text-overflow: ellipsis;
        line-height: 22px;
      }
    }
  }
`;
