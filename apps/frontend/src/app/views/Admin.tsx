import React, { useEffect } from "react";
import ApiClient from "../dataLayer/api/ApiClient";
import styled from "styled-components";
import Auth from "../dataLayer/auth/Auth";
import { Link } from "react-router-dom";

interface ILink {
  id: string;
  longUrl: string;
  shortUrl: string;
}

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
`;

const Admin: React.FunctionComponent = () => {
  const [err, setError] = React.useState(false);
  const [links, setLinks] = React.useState<ILink[] | null>(null);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isReady, setIsReady] = React.useState(Auth.isReady);

  useEffect(() => {
    if (!isReady) {
      setIsReady(false);
      return;
    } else {
      setButtonDisabled(false);
      setIsReady(true);
    }

    try {
      if (authenticated) {
        getData().catch((err) => console.error("Error getting data", err));
      }
    } catch (err) {
      console.error(err);
    }
  }, [authenticated, isReady]);

  const getData = async () => {
    const data = await ApiClient.getAllUrls();
    setLinks(
      data.Urls.map((d) => ({ id: d.Id, longUrl: d.Long, shortUrl: d.Short }))
    );
  };

  const checkAuth = async () => {
    const isAuth = await Auth.client.isAuthenticated();
    if (isAuth) {
      setAuthenticated(true);
    } else {
      await Auth.client.loginWithRedirect();
    }
  };

  const deleteLink = async (id: string, short: string) => {
    try {
      await ApiClient.deleteUrl(id, short);

      const idx = links.findIndex((l) => l.id === id);
      if (idx >= 0) {
        const copy = links;
        links.splice(idx, 1);
        setLinks([...copy]);
      }

      setLinks(links);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      {!authenticated ? (
        <div className="hero">
          <div className="login__wrapper">
            <LoginButton onClick={() => checkAuth()}>Log In</LoginButton>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            fontSize: "1.5rem",
          }}
        >
          <h1 style={{ margin: "5rem 0 2.5rem 0" }}>Links</h1>
          {err ? (
            <div className="messageFailed">
              Something went wrong, take a look at the console
            </div>
          ) : null}
          <table style={{ marginTop: "2.5rem", backgroundColor: "#121212" }}>
            <thead>
              <tr>
                <th>
                  <h3>ID</h3>
                </th>
                <th>Long URL</th>
                <th>Short URL</th>
                <th>delete?</th>
              </tr>
            </thead>
            <tbody>
              {links
                ? links.map((link) => (
                    <tr key={`link-${link.shortUrl}`}>
                      <td>
                        <strong>{link.id}</strong>
                      </td>
                      <td>{link.longUrl}</td>
                      <td>{link.shortUrl}</td>
                      <td>
                        <div
                          className="button"
                          onClick={() => deleteLink(link.id, link.shortUrl)}
                        >
                          Burn it!
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          <Link to="/">
            <div
              style={{
                position: "absolute",
                right: "0",
                top: "0",
                margin: "1.5rem 1.5rem 0 0",
                color: "#FBFBFB",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Home
            </div>
          </Link>
          <div
            style={{
              position: "absolute",
              right: "64px",
              top: "0",
              margin: "1.5rem 1.5rem 0 0",
              color: "#FBFBFB",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => Auth.client.logout()}
          >
            Logout
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
