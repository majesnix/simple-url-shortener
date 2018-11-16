import React, { Component } from 'react';
import axios from 'axios';
import Meta from '../components/meta.jsx';

class Error extends Component {
	constructor(props) {
		super(props);
		this.state = {
			err: false,
		};
	}

	static async getInitialProps({ asPath }) {
		return { asPath };
	}

	componentDidMount = async () => {
		try {
			const { data } = await axios.get(
				`http://${process.env.BASE_URL}:3000/api${this.props.asPath}`
			);
			window.location.href = data.url;
		} catch (err) {
			this.setState({
				err: true
			})
		}
	};

	render() {
		return (
			<div>
				<Meta />
				{this.state.err 
					? <div>
						<h1>404</h1>
						<p>Something went wrong</p>
					</div>
					: null}
			</div>
		);
	}
}

export default Error;
