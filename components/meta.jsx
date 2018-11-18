import React, { Fragment } from 'react';
import Head from 'next/head';
import '../styles/main.scss';

export default () => (
	<Fragment>
		<Head>
			<title>{process.env.BASE_URL}</title>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta charSet="utf-8" />
			<link
				rel="apple-touch-icon"
				sizes="57x57"
				href="/static/apple-icon-57x57.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="60x60"
				href="/static/apple-icon-60x60.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="72x72"
				href="/static/apple-icon-72x72.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href="/static/apple-icon-76x76.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="114x114"
				href="/static/apple-icon-114x114.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="120x120"
				href="/static/apple-icon-120x120.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="144x144"
				href="/static/apple-icon-144x144.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href="/static/apple-icon-152x152.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/static/apple-icon-180x180.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="192x192"
				href="/static/android-icon-192x192.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/static/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="96x96"
				href="/static/favicon-96x96.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/static/favicon-16x16.png"
			/>
			<link rel="manifest" href="/static/manifest.json" />
			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta
				name="msapplication-TileImage"
				content="/static/ms-icon-144x144.png"
			/>
			<meta name="theme-color" content="#ffffff" />
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/static/apple-touch-icon.png?v=XBreOJMe24"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/static/favicon-32x32.png?v=XBreOJMe24"
				sizes="32x32"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/static/favicon-16x16.png?v=XBreOJMe24"
				sizes="16x16"
			/>
			<link
				rel="mask-icon"
				href="/static/safari-pinned-tab.svg?v=XBreOJMe24"
				color="#5bbad5"
			/>
			<link rel="shortcut icon" href="/static/favicon.ico?v=XBreOJMe24" />
			<meta name="apple-mobile-web-app-title" content="dcl.re" />
			<meta name="application-name" content="dcl.re" />
			<meta
				name="msapplication-config"
				content="/static/browserconfig.xml?v=XBreOJMe24"
			/>
			<meta name="theme-color" content="#ffffff" />

			<meta property="og:url" content="https://dcl.re" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content="dcl.re | makes links short." />
			<meta property="og:description" content="simple linkshortener" />
			<meta property="og:image" content="/static/logo_square.png" />
			<meta
				property="og:image:secure_url"
				content="https://dcl.re/static/logo_square.png"
			/>

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content="dcl.re | makes links short." />
			<meta name="twitter:description" content="simple linkshortener" />
			<meta name="twitter:image" content="/static/logo_square.png" />
			<meta name="twitter:image:src" content="/static/logo_square.png" />
		</Head>
		<style jsx global>{`
			body {
				background: #121212;
				font: 10px menlo;
				color: #fbfbfb;
			}
			* {
				box-sizing: border-box;
				position: relative;
				margin: 0;
				padding: 0;
			}
		`}</style>
	</Fragment>
);
