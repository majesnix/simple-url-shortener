import React, { Component, useEffect } from "react";
import Meta from "../components/meta";
import Link from "next/link";
const ky = require("ky/umd");
import protect from "../components/protect";

interface IUser {
	id: string;
	username: string;
	email: string;
}

interface ILink {
	id: number;
	longUrl: string;
	shortUrl: string;
}

const Admin: React.FunctionComponent = () => {
	const [err, setError] = React.useState(false);
	const [users, setUsers] = React.useState<IUser[] | null>(null);
	const [links, setLinks] = React.useState<ILink[] | null>(null);
	const [isBrowser, setIsBrowser] = React.useState(
		typeof window !== "undefined"
	);
	const base =
		process.env.REACT_APP_ENV !== "production"
			? `http://${process.env.BASE_URL}:${process.env.PORT}`
			: `https://${process.env.BASE_URL}`;

	const getData = async () => {
		setUsers(
			await ky
				.get(`${base}/api/users/`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					timeout: 5000,
				})
				.json()
		);
		console.log("ADMIN USERS", users);
		setLinks(
			await ky
				.get(`${base}/api/urls/getAll`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					timeout: 5000,
				})
				.json()
		);
	};

	useEffect(() => {
		try {
			getData().then(() => console.log("Got admin data!"));
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleClick = async (evt: any, id: number) => {
		evt.preventDefault();
		try {
			const links = await ky
				.delete(`${base}/api/urls/${id}`, {
					headers: {
						Authorization: `Bearer ${
							isBrowser && localStorage.getItem("token")
						}`,
					},
				})
				.json();
			console.log("NEW LINKS", links);
			setLinks(links);
		} catch (error) {
			setError(true);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "100vh",
				fontSize: "1.5rem",
			}}
		>
			<Meta />
			<h1 style={{ margin: "1.5rem 0" }}>Users</h1>
			<table>
				<thead>
					<tr>
						<th>
							<h3>ID</h3>
						</th>
						<th>username</th>
						<th>email</th>
					</tr>
				</thead>
				<tbody>
					{users
						? users.map((user) => (
								<tr key={`user-${user.id}`}>
									<td>
										<strong>{user.id}</strong>
									</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
			<h1 style={{ margin: "5rem 0 2.5rem 0" }}>Links</h1>
			{err ? (
				<div className="messageFailed">
					Something went wrong, take a look at the console
				</div>
			) : null}
			<table style={{ marginTop: "2.5rem" }}>
				<thead>
					<tr>
						<th>
							<h3>ID</h3>
						</th>
						<th>Long URL</th>
						<th>Short URL</th>
						<th>delete?</th>
					</tr>
				</thead>
				<tbody>
					{links
						? links.map((link) => (
								<tr key={`link-${link.shortUrl}`}>
									<td>
										<strong>{link.id}</strong>
									</td>
									<td>{link.longUrl}</td>
									<td>{link.shortUrl}</td>
									<td onClick={(evt) => handleClick(evt, link.id)}>
										<div className="button">Burn it!</div>
									</td>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
			<Link href={{ pathname: "/" }}>
				<div
					style={{
						position: "absolute",
						right: "0",
						top: "0",
						margin: "1.5rem 1.5rem 0 0",
						color: "#FBFBFB",
						textDecoration: "none",
						cursor: "pointer",
					}}
				>
					Home
				</div>
			</Link>
		</div>
	);
};

export default protect(Admin);
