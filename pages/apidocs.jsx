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
				marginTop: '15px'
			}}
		>
			<h1>API Documentation</h1>
			<div style={{ width: '50%', fontSize: '2rem', marginTop: 20 }}>
				Yes, you can use our service with an API.
				<br/><br/>
				<table>
					<thead>
						<th>Method</th>
						<th>Endpoint</th>
						<th>Data</th>
						<th>Returns</th>
					</thead>
					<tbody>
						<tr>
							<td>POST</td>
							<td>/api/</td>
							<td>BODY url</td>
							<td>JSON short_url, long_url</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
);

export default Api;