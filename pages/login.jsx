import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.email = React.createRef();
		this.password = React.createRef();
		this.state = {
			errResponse: null,
		};
		this.base =
			process.env.NODE_ENV !== 'production'
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `https://${process.env.BASE_URL}`;
	}

	_handleSubmit = async evt => {
		evt.preventDefault();
		try {
			const {
				data: { token },
			} = await axios.post(`${this.base}/api/users/login`, {
				username: this.email.current.value,
				password: this.password.current.value,
			});
			localStorage.setItem('token', token);
			window.location.href = `${this.base}/admin`;
		} catch (err) {
			this.setState({
				errResponse: err.response.data.message,
			});
		}
	};

	render() {
		return (
			<div className="hero">
				<div className="login__wrapper">
					<form className="login__box" onSubmit={this._handleSubmit}>
						{this.state.errResponse && (
							<div className="login__authfailed">
								{this.state.errResponse}
							</div>
						)}
						<label htmlFor="username">Username</label>
						<br />
						<input
							type="text"
							id="username"
							ref={this.email}
							required
						/>
						<br />
						<label htmlFor="password">Password</label>
						<br />
						<input
							type="password"
							id="password"
							ref={this.password}
							required
						/>
						<br />
						<button type="submit">Sign In</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
