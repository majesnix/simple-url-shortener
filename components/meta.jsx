import React, { Fragment } from 'react';
import Head from 'next/head';

export default () => (
	<Fragment>
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta charSet="utf-8" />
		</Head>
		<style jsx global>{`
			body {
				background: #121212;
				font: 11px menlo;
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
