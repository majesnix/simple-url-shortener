import React from 'react';
import Meta from '../components/meta.jsx';

const Api = () => (
	<div>
		<Meta />
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				marginTop: '15px',
			}}
		>
			<h1>API Documentation</h1>
			<div style={{ width: '50%', fontSize: '1.5rem', marginTop: 20 }}>
				Yes, you can use our service with an API.
				<br />
				<br />
				<table>
					<thead>
						<th>method</th>
						<th>endpoint</th>
						<th>req.query</th>
						<th>req.body</th>
					</thead>
					<tbody>
						<tr>
							<td>GET</td>
							<td>/api/</td>
							<td>url: url to shorten</td>
							<td />
						</tr>
						<tr>
							<td>POST</td>
							<td>/api/</td>
							<td></td>
							<td>url: url to shorten</td>
						</tr>
					</tbody>
				</table>
				<br/><br/>
				Both return a JSON Object with two parameters:
				<br/><br/>
				<strong>base:</strong> the url you send to us
				<br/>
				<strong>short:</strong> your generated short-url
			</div>
		</div>
	</div>
);

export default Api;