import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => (
  <>
    <div
      style={{
        position: 'absolute',
        right: '6.5rem',
        bottom: '0',
        margin: '0 1.5rem 1.5rem 0',
        color: '#FBFBFB',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <Link to="/" style={{ color: '#FBFBFB' }}>
        Home
      </Link>
    </div>
    {/* <div
      style={{
        position: 'absolute',
        right: '6.5rem',
        bottom: '0',
        margin: '0 1.5rem 1.5rem 0',
        color: '#FBFBFB',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <Link to="/apidocs" style={{ color: '#FBFBFB' }}>
        Api
      </Link>
    </div> */}
    <div
      style={{
        position: 'absolute',
        right: '0',
        bottom: '0',
        margin: '0 1.5rem 1.5rem 0',

        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <Link to="/terms" style={{ color: '#FBFBFB' }}>
        Terms
      </Link>
    </div>
  </>
);

export default Links;
