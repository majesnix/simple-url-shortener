import React, { Component } from "react";
import { withRouter } from "next/router";
const ky = require("ky/umd");
import { IState } from "../typings";
import "../styles/main.scss"

class Login extends Component<any, IState> {
	private readonly email: any;
	private readonly password: any;
	private readonly base: string;

	constructor(props: any) {
		super(props);
		this.email = React.createRef();
		this.password = React.createRef();
		this.state = {
			errResponse: null,
			isBrowser: typeof window !== "undefined",
		};
		this.base =
			process.env.REACT_APP_ENV !== "production"
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `https://${process.env.BASE_URL}`;
		if (this.state.isBrowser && localStorage.getItem("token")) {
			window.location.href = `${this.base}/admin`;
		}
	}

	private readonly handleSubmit = async (evt: any) => {
		evt.preventDefault();
		try {
			const { token } = await ky
				.post(`${this.base}/api/users/login`, {
					json: {
						username: this.email.current.value,
						password: this.password.current.value,
					},
				})
				.json();
			localStorage.setItem("token", token);
			window.location.href = `${this.base}/admin`;
		} catch (err) {
			this.setState({
				errResponse: err.response.data.message,
			});
		}
	};

	public render() {
		return (
			<div className="hero">
				<div className="login__wrapper">
					<form className="login__box" onSubmit={this.handleSubmit}>
						{this.state.errResponse && (
							<div className="login__authfailed">{this.state.errResponse}</div>
						)}
						<label htmlFor="username">Username</label>
						<br />
						<input type="text" id="username" ref={this.email} required />
						<br />
						<label htmlFor="password">Password</label>
						<br />
						<input type="password" id="password" ref={this.password} required />
						<br />
						<button type="submit">Sign In</button>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
