import React, { Component } from 'react';
import axios from 'axios';
import Meta from '../components/meta.jsx';
import { IState } from 'typings/index.js';

class Error extends Component<any, IState> {
	private base: string;

	constructor(props: any) {
		super(props);
		this.state = {
			err: false,
		};
		this.base =
			process.env.NODE_ENV !== 'production'
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `https://${process.env.BASE_URL}`;
	}

	static async getInitialProps({ asPath }) {
		return { asPath };
	}

	componentDidMount = async () => {
		try {
			const { data } = await axios.get(
				`${this.base}/api/urls${this.props.asPath}`
			);
			window.location.href = data.url;
		} catch (err) {
			this.setState({
				err: true,
			});
		}
	};

	render() {
		return (
			<div>
				<Meta />
				{this.state.err ? (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100vh',
							fontSize: '1.8rem',
						}}
					>
						<h1>404</h1>
						<p>
							No Shortlink with this ID exists or something went
							wrong
						</p>
					</div>
				) : null}
			</div>
		);
	}
}

export default Error;
