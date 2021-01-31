import React from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Routes from "./Routes";
import { Helmet } from "react-helmet";
import createStore from "./dataLayer/stores/createStore";
import { StoreProvider } from "./components/StoreProvider";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const rootStore = createStore();

const App = () => {
  return (
    <StoreProvider value={rootStore}>
      <BrowserRouter>
        <Wrapper>
          <Helmet>
            <title>{process.env.NX_BASE_URL}</title>
          </Helmet>
          <Routes />
        </Wrapper>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
