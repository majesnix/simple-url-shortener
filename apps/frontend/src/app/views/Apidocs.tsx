import React from "react";
import Links from "../components/Links";

const ApiDocs = () => (
	<div style={{ height: "100vh" }}>
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "100%",
				paddingTop: "1.5rem",
				fontSize: "1.5rem",
			}}
		>
			<Links />
			<h1>API Documentation</h1>
			<div style={{ width: "50%", fontSize: "1.5rem", marginTop: 20 }}>
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
							<td>/api/urls/</td>
							<td>url: url to shorten</td>
							<td>—</td>
						</tr>
						<tr>
							<td>POST</td>
							<td>/api/urls/</td>
							<td>—</td>
							<td>url: url to shorten</td>
						</tr>
					</tbody>
				</table>
				<br />
				<br />
				Both return a JSON Object with two properties:
				<br />
				<br />
				<strong>base:</strong> the url you send to us
				<br />
				<strong>short:</strong> your generated short-url
			</div>
		</div>
	</div>
);

export default ApiDocs;
