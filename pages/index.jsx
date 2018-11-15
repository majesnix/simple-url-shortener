import React, { Component } from 'react';
import Axios from 'axios';
import Meta from '../components/meta.jsx';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: null,
			shortID: null,
			err: false
		}
	}

	handleSubmit = async evt => {
		evt.preventDefault();
		const { data: { short } } = await Axios.post('http://localhost:3000/api/', { url: this.state.url });
		this.setState({
			shortID: short
		})
	};

	handleChange = evt => {
		this.setState({
			url: evt.target.value
		});
	};

	render() {
		return <div style={{ height: '100vh' }}>
				<Meta />
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
					<h1>dcl.re</h1>
					<form style={{ marginLeft: '15px' }}>
						<input type="text" id="url" placeholder="Enter URL here..." onChange={evt => this.handleChange(evt)} style={{ marginRight: '15px' }} />
						<button style={{ padding: '5px', borderRadius: '15px' }} type="submit" onClick={evt => this.handleSubmit(evt)}>
							Shorten
						</button>
					</form>
				</div>
				{this.state.shortID ? <div>
						https://dcl.re/{this.state.shortID}
					</div> : null}
				{this.state.err ? <div>
						Something went wrong
					</div> : null}
			</div>;
	}
}

export default Index;
