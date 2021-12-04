import React from "react";
import styled from "styled-components";
import { useStore } from "../components/StoreProvider";
import { useNavigate } from "react-router-dom";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";

const LoginButton = styled.button`
  font-size: 30px;
  width: 300px;
  height: 80px;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  cursor: pointer;
  color: white;
  border: none;
  &:disabled {
    opacity: 0.5;
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
`;

const Login = () => {
  const navigate = useNavigate();
  const { app } = useStore();

  const checkAuth = async () => {
    if (await app.checkAuth()) {
      navigate("/admin");
    } else {
      await app.auth.loginWithRedirect();
    }
  };

  return (
    <div className="hero">
      <div className="login__wrapper">
        <LoginButton
          onClick={async () => await checkAuth()}
          disabled={!app.auth0Initiated}
        >
          {app.auth0Initiated ? (
            "Log In"
          ) : (
            <LoadingDiv>
              <FontAwesomeIcon icon={faCircleNotch} spin /> Loading
            </LoadingDiv>
          )}
        </LoginButton>
      </div>
    </div>
  );
};

export default observer(Login);
