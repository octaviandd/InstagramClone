/** @format */

import React from "react";
import styled from "styled-components";
import ProfileSVG from "../assets/profile-svg";
import SettingSVG from "../assets/settings-svg";
import { Link } from "react-router-dom";

export default function SettingsDropdown({ id, logOut }) {
  return (
    <MainContainter>
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
    </MainContainter>
  );
}

const MainContainter = styled.div`
  position: absolute;
  right: 0px;
  top: 63px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(32, 29, 30, 1) 35%,
    rgba(3, 25, 29, 1) 100%
  );
  max-width: 200px;
  width: 100%;
  z-index: 999;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px #dbdbdb;
  ul {
    li:nth-of-type(1) {
      &:hover {
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
      }
    }
    li:nth-of-type(3) {
      &:hover {
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
      }
    }
    li {
      list-style: none;
      display: flex;
      align-items: center;
      line-height: 50px;
      height: 50px;
      padding-left: 10px;
      color: whitesmoke;

      &:hover {
        background-color: #c609ec;
      }

      a {
        text-decoration: none;
        color: whitesmoke;
      }

      div {
        display: flex;
        align-items: center;
        /* margin-bottom: 17.5px; */
      }
      span {
        margin-right: 15px;
        font-weight: 400;

        svg {
          fill: whitesmoke;
        }
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
        color: whitesmoke;
      }
    }
  }
`;
