import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import ApiClient from "../dataLayer/api/ApiClient";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import Links from "../components/Links";

const Index = () => {
  const base =
    process.env.REACT_APP_ENV !== "production"
      ? `http://${process.env.NX_BASE_URL}:${process.env.NX_PORT}`
      : `https://${process.env.NX_BASE_URL}`;

  const [url, setUrl] = useState("https://");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [err, setErr] = useState(false);
  const [ratelimit, setRatelimit] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    try {
      const short = await ApiClient.createShortUrl(url);

      setUrl("https://");
      setShortUrl(short);
      setRatelimit(false);
      setErr(false);

      // write short url to clipboard
      navigator.clipboard.writeText(`${base}/${short}`);
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
    } catch (error) {
      console.log(error);
      if (error.response.status === 429) {
        setRatelimit(true);
      } else {
        setErr(true);
      }
      setShortUrl(null);
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: "1.5rem",
        }}
      >
        <Links />
        <h1>{process.env.NX_APP_NAME}</h1>
        <form
          style={{
            marginLeft: "1.5rem",
            marginTop: "1.5rem",
            display: "flex",
          }}
        >
          <input
            type="text"
            id="url"
            placeholder="Enter URL here..."
            value={url ? url : undefined}
            onChange={(evt) => handleChange(evt)}
            style={{
              marginRight: "1.5rem",
              fontSize: "1.8rem",
              width: "25rem",
            }}
            autoFocus
          />
          <button
            className="button"
            type="submit"
            onClick={(evt) => handleSubmit(evt)}
          >
            Shorten
          </button>
        </form>
        {shortUrl ? (
          <div
            style={{
              marginTop: "1.5rem",
              cursor: "pointer",
            }}
          >
            <CopyToClipboard
              text={`${base}/${shortUrl}`}
              onCopy={() => {
                setCopied(true);
              }}
            >
              <span>{`${base}/${shortUrl}`}</span>
            </CopyToClipboard>
          </div>
        ) : null}
        {ratelimit && (
          <div>You send to many requests, please wait 60 minutes</div>
        )}
        {err && <div>Something went wrong</div>}
      </div>
    </div>
  );
};

export default Index;
