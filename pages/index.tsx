import React, { Component } from "react";
const ky = require("ky/umd");
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import Meta from "../components/meta";
import { IState } from "../typings";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";

class Index extends Component<any, IState> {
	private readonly base: string;

	constructor(props: any) {
		super(props);
		this.state = {
			url: "",
			shortURL: null,
			err: false,
			ratelimit: false,
			copied: false,
		};
		this.base =
			process.env.REACT_APP_ENV !== "production"
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `https://${process.env.BASE_URL}`;
	}

	public handleSubmit = async (evt: any) => {
		evt.preventDefault();
		try {
			console.log("click");
			const { short } = await ky
				.post(`${this.base}/api/urls`, {
					json: { url: this.state.url },
				})
				.json();
			this.setState({
				url: "",
				shortURL: short,
				ratelimit: false,
				err: false,
			});
			// write short url to clipboard
			navigator.clipboard.writeText(short);
			this.setState({
				url: "https://",
			});
			toast.notify(({ onClose }) => (
				<div
					style={{
						width: "300px",
						height: "42px",
						backgroundColor: "#2e7d32",
						fontSize: 24,
						borderRadius: "25px",
					}}
					onClick={onClose}
				>
					Url copied to clipboard!
				</div>
			));
		} catch (error) {
			console.log(error);
			if (error.response.status === 429) {
				return this.setState({
					ratelimit: true,
					shortURL: null,
				});
			}
			this.setState({
				err: true,
				shortURL: null,
			});
		}
	};

	public handleChange = (evt: any) => {
		this.setState({
			url: evt.target.value,
		});
	};

	public render() {
		return (
			<div style={{ height: "100vh" }}>
				<Meta />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						fontSize: "1.5rem",
					}}
				>
					{/*<Link href={{ pathname: "/login" }}>
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
							Admin
						</div>
					</Link>*/}
					<Link href={{ pathname: "/apidocs" }}>
						<div
							style={{
								position: "absolute",
								right: "7.5rem",
								bottom: "0",
								margin: "0 1.5rem 1.5rem 0",
								color: "#FBFBFB",
								textDecoration: "none",
								cursor: "pointer",
							}}
						>
							Api
						</div>
					</Link>
					<Link href={{ pathname: "/terms" }}>
						<div
							style={{
								position: "absolute",
								right: "0",
								bottom: "0",
								margin: "0 1.5rem 1.5rem 0",
								color: "#FBFBFB",
								textDecoration: "none",
								cursor: "pointer",
							}}
						>
							Terms
						</div>
					</Link>
					<h1>{process.env.BASE_URL}</h1>
					<form
						style={{
							marginLeft: "1.5rem",
							marginTop: "1.5rem",
							display: "flex",
						}}
					>
						<input
							type="text"
							id="url"
							placeholder="Enter URL here..."
							value={this.state.url ? this.state.url : undefined}
							onChange={(evt) => this.handleChange(evt)}
							style={{
								marginRight: "1.5rem",
								fontSize: "1.8rem",
								width: "25rem",
							}}
							autoFocus
						/>
						<button
							className="button"
							type="submit"
							onClick={this.handleSubmit}
						>
							Shorten
						</button>
					</form>
					{this.state.shortURL ? (
						<div
							style={{
								marginTop: "1.5rem",
								cursor: "pointer",
							}}
						>
							<CopyToClipboard
								text={this.state.shortURL}
								onCopy={() => {
									this.setState({ copied: true });
								}}
							>
								<span>{this.state.shortURL}</span>
							</CopyToClipboard>
						</div>
					) : null}
					{this.state.ratelimit && (
						<div>You sent to many requests, please wait 60 minutes</div>
					)}
					{this.state.err && <div>Something went wrong</div>}
				</div>
			</div>
		);
	}
}

export default Index;
