import React, { Component } from "react";
const ky = require("ky/umd");
import Meta from "../components/meta";
import { IState } from "../typings";

class Error extends Component<any, IState> {
	private readonly base: string;

	constructor(props: any) {
		super(props);
		this.state = {
			err: false,
		};
		this.base =
			process.env.REACT_APP_ENV !== "production"
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `https://${process.env.BASE_URL}`;
	}

	public static async getInitialProps({ asPath }: { asPath: any }) {
		return { asPath };
	}

	public componentDidMount = async () => {
		try {
			const data = await ky
				.get(`${this.base}/api/urls${this.props.asPath}`)
				.json();
			console.log("DATA ERROR", data);
			window.location.href = data.url;
		} catch (err) {
			console.error("ERROR IN ERROR", err);
			this.setState({
				err: true,
			});
		}
	};

	public render() {
		return (
			<div>
				<Meta />
				{this.state.err && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							height: "100vh",
							fontSize: "1.8rem",
						}}
					>
						<img src="/static/error.png"></img>
						<h1>404</h1>
						<p>No Shortlink with this ID exists or something went wrong</p>
					</div>
				)}
			</div>
		);
	}
}

export default Error;
