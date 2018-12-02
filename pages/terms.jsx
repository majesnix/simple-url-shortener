import React from 'react';
import Link from 'next/link';
import Meta from '../components/meta.jsx';

const Terms = () => (
	<div>
		<Meta />
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				marginTop: '1.5rem',
				fontSize: '1.5rem',
			}}
		>
			<Link href={{ pathname: '/' }}>
				<div
					style={{
						position: 'absolute',
						right: '7.5rem',
						bottom: '0',
						margin: '0 1.5rem 1.5rem 0',
						color: '#FBFBFB',
						textDecoration: 'none',
						cursor: 'pointer',
					}}
				>
					Home
				</div>
			</Link>
			<Link href={{ pathname: '/apidocs' }}>
				<div
					style={{
						position: 'absolute',
						right: '0',
						bottom: '0',
						margin: '0 1.5rem 1.5rem 0',
						color: '#FBFBFB',
						textDecoration: 'none',
						cursor: 'pointer',
					}}
				>
					Api
				</div>
			</Link>

			<h1>Terms of Service</h1>
			<div style={{ width: '50%', fontSize: '2rem', marginTop: '2rem' }}>
				By accessing the website at https://dcl.re, you are agreeing to
				be bound by these terms of service, all applicable laws and
				regulations, and agree that you are responsible for compliance
				with any applicable local laws. If you do not agree with any of
				these terms, you are prohibited from using or accessing this
				site. The materials contained in this website are protected by
				applicable copyright and trademark law.
				<br />
				<br />
				In no event shall dcl.re or its suppliers be liable for any
				damages (including, without limitation, damages for loss of data
				or profit, or due to business interruption) arising out of the
				use or inability to use the materials on dcl.re's website, even
				if dcl.re or a dcl.re authorized representative has been
				notified orally or in writing of the possibility of such damage.
				Because some jurisdictions do not allow limitations on implied
				warranties, or limitations of liability for consequential or
				incidental damages, these limitations may not apply to you.
				<br />
				<br />
				The materials appearing on dcl.re website could include
				technical, typographical, or photographic errors. dcl.re does
				not warrant that any of the materials on its website are
				accurate, complete or current. dcl.re may make changes to the
				materials contained on its website at any time without notice.
				However dcl.re does not make any commitment to update the
				materials.
				<br />
				<br />
				dcl.re has not reviewed all of the sites linked to its website
				and is not responsible for the contents of any such linked site.
				The inclusion of any link does not imply endorsement by dcl.re
				of the site. Use of any such linked website is at the user's own
				risk.
				<br />
				<br />
				dcl.re may revise these terms of service for its website at any
				time without notice. By using this website you are agreeing to
				be bound by the then current version of these terms of service.
			</div>
		</div>
	</div>
);

export default Terms;
