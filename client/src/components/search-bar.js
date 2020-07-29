/** @format */

import React from "react";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({ value, handleInput, clearText, active }) {
  return (
    <MainContainer active={active}>
      <div>
        <input
          tabIndex="1"
          type="text"
          id="search-input"
          value={value}
          onChange={(e) => handleInput(e)}
        />
        <span id="search-icon">
          <FaSearch />
        </span>
        <span id="search-placeholder">Search</span>
        <span id="search-close" onClick={() => clearText()}>
          <FaTimes />
        </span>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  div {
    position: relative;

    #search-close {
      opacity: 0;
    }
    input {
      position: relative;
      background-color: #fafafa;
      border: 1px solid #dbdbdb;
      border-radius: 3px;
      font-size: 14px;
      padding-left: 24px;
      padding-right: 10px;
      padding-top: 3px;
      padding-bottom: 3px;
      line-height: 20px;
      text-indent: 70px;

      &:focus {
        text-indent: 0;
        outline: #a2a2a2;
      }

      &:focus ~ #search-icon {
        left: 10px;
      }

      &:focus ~ #search-close {
        opacity: 1;
      }

      &:focus ~ #search-placeholder {
        left: 25px;
        ${({ active }) =>
          active &&
          `
        display: none;
      `}
      }
    }

    span {
      position: absolute;
      svg {
        fill: #c7c7c7;
      }
    }

    span:nth-of-type(1) {
      left: 76px;
      top: 5px;
      line-height: 20px;
      svg {
        width: 12px;
        height: 12px;
      }
    }

    span:nth-of-type(2) {
      left: 96px;
      top: 4px;
      color: #8e8e8e;
      font-size: 14px;
      line-height: 20px;
      pointer-events: none;
      ${({ active }) =>
        active &&
        `
        display: none;
      `}
    }
    span:nth-of-type(3) {
      top: 5px;
      right: 10px;
      svg {
        background-color: #c7c7c7;
        border-radius: 50%;
        fill: #f2f2f2;
        width: 12px;
        height: 12px;
        padding: 1px 3px;
      }
    }
  }
`;
