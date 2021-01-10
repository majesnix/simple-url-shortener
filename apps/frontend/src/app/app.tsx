import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import styled from "styled-components";
import Routes from "./Routes";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export function App() {
  return (
    <Wrapper>
      <Helmet>
        <title>{process.env.NX_BASE_URL}</title>
      </Helmet>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
