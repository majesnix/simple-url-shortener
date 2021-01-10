import React, { useEffect, useState } from 'react';
import ky from 'ky';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errResponse, setErrResponse] = useState<any>(null);
  const base =
    process.env.REACT_APP_ENV !== 'production'
      ? `http://${process.env.NX_BASE_URL}:${process.env.NX_PORT}`
      : `https://${process.env.NX_BASE_URL}`;

  useEffect(() => {
    if (localStorage.getItem('token')) window.location.href = `${base}/admin`;
  });

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const { token } = await ky
        .post(`${base}/api/users/login`, {
          json: {
            username: email,
            password: password,
          },
        })
        .json();
      localStorage.setItem('token', token);
      window.location.href = `${base}/admin`;
    } catch (err) {
      setErrResponse(err.response.data.message);
    }
  };

  return (
    <div className="hero">
      <div className="login__wrapper">
        <form className="login__box" onSubmit={handleSubmit}>
          {errResponse && (
            <div className="login__authfailed">{errResponse}</div>
          )}
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
