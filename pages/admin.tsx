import React, { Component } from "react";
import Meta from "../components/meta";
import Link from "next/link";
import Axios from "axios";
import { IState } from "../typings";
import protect from "../components/protect";

class Admin extends Component<any, IState> {
	private readonly base: string;

	constructor(props: any) {
		super(props);
		this.state = {
			err: false,
			users: null,
			links: null,
			isBrowser: typeof window !== "undefined"
		};
		this.base =
			process.env.REACT_APP_ENV !== "production"
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `https://${process.env.BASE_URL}`;
	}

	public componentDidMount = async () => {
		try {
			const {
				data: { users },
			} = await Axios.get(`${this.base}/api/users/`, {
				headers: {
					Authorization: `Bearer ${this.state.isBrowser && localStorage.getItem("token")}`,
				},
				timeout: 5000,
			});
			const {
				data: { urls: links },
			} = await Axios.get(`${this.base}/api/urls/getAll`, {
				headers: {
					Authorization: `Bearer ${this.state.isBrowser && localStorage.getItem("token")}`,
				},
				timeout: 5000,
			});

			this.setState({
				users,
				links,
			});
		} catch (error) {
			console.log(error);
		}
	}

	public handleClick = async (evt: any, id: number) => {
		evt.preventDefault();
		try {
			const {
				data: { urls: links },
			} = await Axios.delete(`${this.base}/api/urls/${id}`, {
				headers: {
					Authorization: `Bearer ${this.state.isBrowser && localStorage.getItem("token")}`,
				},
			});
			this.setState({
				links,
			});
		} catch (error) {
			this.setState({
				err: true,
			});
		}
	}

	public render() {
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
						{this.state.users
							? this.state.users.map(user => (
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
				{this.state.err ? (
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
						{this.state.links
							? this.state.links.map(link => (
									<tr key={`link-${link.shortUrl}`}>
										<td>
											<strong>{link.id}</strong>
										</td>
										<td>{link.longUrl}</td>
										<td>{link.shortUrl}</td>
										<td onClick={evt => this.handleClick(evt, link.id)}>
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
	}
}

export default protect(Admin);
