import React, { Component } from 'react';
import Meta from '../components/meta';
import Link from 'next/link';
import Axios from 'axios';

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			err: false,
			users: null,
			links: null,
		};
		this.base =
			process.env.NODE_ENV !== 'production'
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `https://${process.env.BASE_URL}`;
	}

	componentDidMount = async () => {
		try {
			const { data: { users } } = await Axios.get(
				`${this.base}/api/users/`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
					timeout: 5000,
				}
			);
			const { data: { urls: links } } = await Axios.get(
				`${this.base}/api/urls/getAll`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
					timeout: 5000,
				}
			);

			this.setState({
				users,
				links,
			});
		} catch (error) {
			window.location.href = this.base;
		}
	};

	handleClick = async (evt, id) => {
		evt.preventDefault();
		try {
			const {
				data: { urls: links },
			} = await Axios.delete(`${this.base}/api/urls/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			this.setState({
				links,
			});
		} catch (error) {
			this.setState({
				err: true
			});
		}
	};

	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<Meta />
				<h1 style={{ marginTop: 15 }}>ADMIN</h1>
				<h3 style={{ marginTop: 15 }}>Users</h3>
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
										<td>
											{user.username}
										</td>
										<td>
											{user.email}
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</table>
				<h3 style={{ margin: '50px 0 25px 0' }}>LINKS</h3>
				{this.state.err ? <div style={{ backgroundColor: 'red', padding: 15, borderRadius: 25}}>Something went wrong, take a look at the console</div> : null}
				<table style={{ marginTop: '25px'}}>
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
									<tr key={`link-${link.short_url}`}>
										<td>
											<strong>{link.id}</strong>
										</td>
										<td>
											{link.long_url}
										</td>
										<td>
											{link.short_url}
										</td>
										<td
											onClick={evt =>
												this.handleClick(evt, link.id)
											}
										>
											<div className="button">Click</div>
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</table>
				<Link href={{ pathname: '/' }}>
					<div
						style={{
							position: 'absolute',
							right: '0',
							top: '0',
							margin: '15px 15px 0 0',
							color: '#FBFBFB',
							textDecoration: 'none',
							cursor: 'pointer',
						}}
					>
						Home
					</div>
				</Link>
			</div>
		);
	}
}

export default Admin;
