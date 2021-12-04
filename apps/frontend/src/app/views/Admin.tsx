import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStore } from "../components/StoreProvider";
import ApiClient from "../dataLayer/api/ApiClient";
import { Link, useNavigate } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import ResizeObserver from "resize-observer-polyfill";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import Dot from "../components/Dot";

interface IDbUrl {
  Long: string;
  Short: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  font-size: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  width: 70%;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  height: 15px;
  padding: 8px;
`;

const Column = styled.div<{ isCheckbox?: boolean }>`
  width: ${(props) => (props.isCheckbox ? "10%" : "45%")};
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  color: #fbfbfb;
  width: 120px;
  height: 40px;
  background-color: #b22222;
  border: none;
  right: 0;
  position: absolute;
`;

const LogoutButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 1.5rem 1.5rem 0 0;
  color: #fbfbfb;
  text-decoration: none;
  cursor: pointer;
`;

const Admin = () => {
  const navigate = useNavigate();
  const { app } = useStore();
  const [err, setError] = useState(false);
  const [urls, setUrls] = useState<IDbUrl[] | null>(null);
  const [selected, setSelected] = useState<{ Short: string }[]>([]);
  const [width, setWidth] = useState(window.innerWidth * 0.7);
  const [height, setHeight] = useState(window.innerHeight * 0.5);

  const listRef = useRef<List | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  // check auth and get data
  useEffect(() => {
    app.checkAuth().then((authenticated) => {
      if (!authenticated) navigate("/login");

      if (app.auth0Initiated && app.authenticated) {
        getData().catch((err) => console.error("Error getting data", err));
      }
    });
  }, []);

  // add resize handler
  useEffect(() => {
    let resizeObserver: ResizeObserver;

    const list = ref.current;
    if (list) {
      const handleResize = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { height, width } = list.getBoundingClientRect();
        setHeight(height);
        setWidth(width);
      };

      resizeObserver = new ResizeObserver(handleResize);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const getData = async () => {
    const data = await ApiClient.getAllUrls();
    setUrls(data.Urls);
  };

  const Row = ({ index, data }: { data: IDbUrl[]; index: number }) => {
    // Lookup up, whether the element is selected or not, and return its id
    const elementIndex = selected.findIndex(
      (s) => s.Short === data[index].Short
    );
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: "8px",
          padding: "8px",
          // border: "1px solid grey",
          backgroundColor: index % 2 ? "#525252" : "black",
          height: "50px",
        }}
      >
        <Column isCheckbox>
          <input
            type="checkbox"
            checked={elementIndex >= 0}
            onChange={() => {
              if (elementIndex >= 0) {
                const copy = selected;
                copy.splice(elementIndex, 1);
                setSelected([...copy]);
              } else {
                setSelected([...selected, { Short: data[index].Short }]);
              }
            }}
          />
        </Column>
        <Column>{data[index].Short}</Column>
        <Column
          onClick={async () => {
            // copy to clipboard
            await navigator.clipboard.writeText(data[index].Long);

            // send notification
            toast.notify(({ onClose }) => (
              <div
                style={{
                  width: "300px",
                  height: "42px",
                  backgroundColor: "#2e7d32",
                  fontSize: 24,
                  borderRadius: "25px",
                }}
                onClick={onClose}
              >
                Url copied to clipboard!
              </div>
            ));
          }}
        >
          {data[index].Long.length > 50
            ? `${data[index].Long.substr(0, 50)}...`
            : data[index].Long}
        </Column>
      </div>
    );
  };

  const deleteMultiple = async () => {
    try {
      await ApiClient.deleteUrls(selected);

      for (const entry of selected) {
        const idx = urls.findIndex((l) => l.Short === entry.Short);
        if (idx >= 0) {
          const copy = urls;
          urls.splice(idx, 1);
          setUrls([...copy]);
        }

        setUrls(urls);
        setSelected([]);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <Container>
      <h1 style={{ margin: "5rem 0 2.5rem 0" }}>Links</h1>
      {err ? (
        <div className="messageFailed">
          Something went wrong, take a look at the console
        </div>
      ) : null}
      {urls ? (
        <>
          <Header>
            <Column isCheckbox>Delete</Column>
            <Column>Short Id</Column>
            <Column>Resolves to</Column>
          </Header>

          <div
            style={{
              width: "70%",
            }}
            ref={ref}
          >
            <List
              className="List"
              ref={listRef}
              style={{ position: "relative" }}
              itemData={urls}
              height={height}
              itemCount={urls.length}
              itemSize={35}
              width={width}
            >
              {Row}
            </List>
            <DeleteButton onClick={() => deleteMultiple()}>Delete</DeleteButton>
          </div>
        </>
      ) : (
        <div style={{ display: "flex" }}>
          Loading <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </div>
      )}
      <Link
        to="/"
        style={{
          position: "absolute",
          right: "64px",
          top: "0",
          margin: "1.5rem 1.5rem 0 0",
          color: "#FBFBFB",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        Home
      </Link>
      <LogoutButton
        onClick={() => app.auth.logout({ returnTo: "https://dcl.re" })}
      >
        Logout
      </LogoutButton>
    </Container>
  );
};

export default observer(Admin);
