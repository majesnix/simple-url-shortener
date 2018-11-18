import React, { Component } from 'react';
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
			const {
				data: { users },
			} = await Axios.get(`${this.base}/api/users/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			const {
				data: { urls: links },
			} = await Axios.get(`${this.base}/api/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});

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
			} = await Axios.delete(`${this.base}/api/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			this.setState({
				links,
			});
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<h1>ADMIN</h1>
				<h3 style={{ marginTop: '15px' }}>Users</h3>
				{this.state.users
					? this.state.users.map(user => (
							<div key={`user-${user.id}`}>
								{user.username}, {user.email}
							</div>
					  ))
					: null}
				<h3 style={{ marginTop: '15px' }}>LINKS</h3>
				<table>
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
										<td
											style={{
												width: 200,
												textAlign: 'center',
											}}
										>
											{link.long_url}
										</td>
										<td
											style={{
												width: 150,
												textAlign: 'center',
											}}
										>
											{link.short_url}
										</td>
										<td
											style={{ textAlign: 'center' }}
											onClick={evt =>
												this.handleClick(evt, link.id)
											}
										>
											Click
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Admin;
