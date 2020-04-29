import Link from "next/link";
import React, { useEffect } from "react";
import Meta from "../components/meta";
const ky = require("ky/umd");
import "../styles/main.scss";

interface IUser {
	id: number;
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
	const base =
		process.env.REACT_APP_ENV !== "production"
			? `http://${process.env.BASE_URL}:${process.env.PORT}`
			: `https://${process.env.BASE_URL}`;

	const checkAdmin = async () => {
		await ky.get("/api/users/isAdmin", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			timeout: 5000,
		});
	};

	useEffect(() => {
		checkAdmin()
			.then(() => console.log("Admin check passed"))
			.catch(() => {
				window.location.href = base;
			});
	}, []);

	const getData = async () => {
		const { users } = await ky
			.get(`${base}/api/users/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				timeout: 5000,
			})
			.json();
		setUsers(users);
		const { urls: links } = await ky
			.get(`${base}/api/urls/getAll`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				timeout: 5000,
			})
			.json();
		setLinks(links);
	};

	useEffect(() => {
		try {
			getData().then(() => console.log("Got admin data!"));
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleClick = async (id: number) => {
		try {
			const { urls: links } = await ky
				.delete(`${base}/api/urls/${id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.json();
			setLinks(links);
		} catch (error) {
			setError(true);
		}
	};

	const deleteUser = async (user: IUser) => {
		try {
			await ky.delete(`${base}/api/users/${user.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			const idx = users!.indexOf(user);
			if (idx) {
				const copy = users;
				copy!.splice(idx, 1);
				setUsers([...copy!]);
			}
		} catch (error) {
			setError(true);
		}
	};

	const _handleLogoutClick = () => {
		localStorage.removeItem("token");
		window.location.href = base;
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
			<table style={{ backgroundColor: "#121212" }}>
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
									<td>
										<div
											style={{ color: "red" }}
											onClick={() => deleteUser(user)}
										>
											🗑
										</div>
									</td>
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
									<td>
										<div
											className="button"
											onClick={() => handleClick(link.id)}
										>
											Burn it!
										</div>
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
			<div
				style={{
					position: "absolute",
					right: "32px",
					top: "0",
					margin: "1.5rem 1.5rem 0 0",
					color: "#FBFBFB",
					textDecoration: "none",
					cursor: "pointer",
				}}
				onClick={() => _handleLogoutClick()}
			>
				Logout
			</div>
		</div>
	);
};

export default Admin;
