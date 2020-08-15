/** @format */

import React from "react";
import styled from "styled-components";

export default function ErrorBox() {
  return (
    <MainContainer>
      <div></div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;
