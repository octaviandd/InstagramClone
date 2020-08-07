/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GET_USERS, GET_CURRENT_USER } from "../helpers/queries";
import { useQuery } from "@apollo/client";
import SearchBar from "./search-bar";
import Spinner from "../components/spinner";
import HomeSVG from "../assets/home-svg";
import MessageSVG from "../assets/message-svg";
import ExploreSVG from "../assets/explore-svg";
import UnlikedHeart from "../assets/unliked-heart";
import ProfileSVG from "../assets/profile-svg";
import SettingSVG from "../assets/settings-svg";

export default function Navbar({ id }) {
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
  if (loading) return <Spinner />;

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
              <HomeSVG />
            </Link>
          </div>
          <div>
            <Link to="">
              <MessageSVG />
            </Link>
          </div>
          <div>
            <Link to="/explore">
              <ExploreSVG />
            </Link>
          </div>
          <div>
            <Link to="">
              <UnlikedHeart />
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
                <Link to={`/profile/${id}`}>
                  <div>
                    <span>
                      <ProfileSVG />
                    </span>
                    <span>Profile</span>
                  </div>
                </Link>
              </li>
              <li>
                <div>
                  <span>
                    <SettingSVG />
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
