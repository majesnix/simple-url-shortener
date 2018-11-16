import React, { Component } from 'react';
import Axios from 'axios';
import Meta from '../components/meta.jsx';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'http://',
			shortID: null,
			err: false,
		};
		this.base =
			process.env.NODE_ENV !== 'production'
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `http://${process.env.BASE_URL}`;
	}

	handleSubmit = async evt => {
		evt.preventDefault();
		try {
			const {
				data: { short },
			} = await Axios.post(
				`${this.base}/api/`,
				{
					url: this.state.url,
				}
			);
			this.setState({
				shortID: short,
			});	
		} catch (error) {
			this.setState({
				err: true,
			})
		}
	};

	handleChange = evt => {
		this.setState({
			url: evt.target.value,
		});
	};

	render() {
		return (
			<div style={{ height: '100vh' }}>
				<Meta />
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
					}}
				>
					<h1>{process.env.BASE_URL}</h1>
					<form style={{ marginLeft: '15px', marginTop: '15px' }}>
						<input
							type="text"
							id="url"
							placeholder="Enter URL here..."
							value={this.state.url}
							onChange={evt => this.handleChange(evt)}
							style={{ marginRight: '15px' }}
						/>
						<button
							style={{ padding: '5px', borderRadius: '15px' }}
							type="submit"
							onClick={evt => this.handleSubmit(evt)}
						>
							Shorten
						</button>
					</form>
					{this.state.shortID ? (
						<div style={{ marginTop: '15px' }}>
							{this.base}/
							{this.state.shortID}
						</div>
					) : null}
					{this.state.err ? <div>Something went wrong</div> : null}
				</div>
			</div>
		);
	}
}

export default Index;
