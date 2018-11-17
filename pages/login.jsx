import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.email = React.createRef();
		this.password = React.createRef();
		this.state = {
			errResponse: null
		};
	}

	_handleSubmit = async e => {
		e.preventDefault();
		return console.log('NOT IMPLEMENTED');
		/*try {
			const {
				data: { token, refreshToken },
			} = await axios.post(
				this.email.current.value,
				this.password.current.value
			);
			localStorage.setItem('token', token);
			localStorage.setItem('refreshToken', refreshToken);
			this.props.history.push('/admin');
		} catch (err) {
			console.log(err.response);
			this.setState({
				errResponse: err.response.data.message
			})
		}*/
	};

	render() {
		return (
			<div className="hero">
				<div className="login__wrapper">
					<form
						className="login__box"
						onSubmit={this._handleSubmit}
					>
						{this.state.errResponse && <div className="login__authfailed">{this.state.errResponse}</div>}
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
