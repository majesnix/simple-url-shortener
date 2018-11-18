import React, { Component } from 'react';
import Axios from 'axios';
import Link from 'next/link';
import Meta from '../components/meta.jsx';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'https://',
			shortURL: null,
			err: false,
		};
		this.base =
			process.env.NODE_ENV !== 'production'
				? `http://${process.env.BASE_URL}:${process.env.PORT}`
				: `https://${process.env.BASE_URL}`;
	}

	handleSubmit = async evt => {
		evt.preventDefault();
		try {
			const {
				data: { short },
			} = await Axios.post(
				`${this.base}/api/urls`,
				{
					url: this.state.url,
				}
			);
			this.setState({
				shortURL: short,
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
					<Link href={{ pathname: '/login' }}><div style={{ position: 'absolute', right: '0', top: '0', margin: '15px 15px 0 0', color: '#FBFBFB', textDecoration: 'none', cursor: 'pointer' }}>Admin</div></Link>
					<Link href={{ pathname: '/apidocs' }}><div style={{ position: 'absolute', right: '50px', bottom: '0', margin: '0 15px 15px 0', color: '#FBFBFB', textDecoration: 'none', cursor: 'pointer'  }}>Api</div></Link>
					<Link href={{ pathname: '/terms' }}><div style={{ position: 'absolute', right: '0', bottom: '0', margin: '0 15px 15px 0', color: '#FBFBFB', textDecoration: 'none', cursor: 'pointer'  }}>Terms</div></Link>
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
						<div
							className="button"
							type="submit"
							onClick={evt => this.handleSubmit(evt)}
						>
							Shorten
						</div>
					</form>
					{this.state.shortURL ? (
						<div style={{ marginTop: '15px' }}>
							{this.state.shortURL}
						</div>
					) : null}
					{this.state.err ? <div>Something went wrong</div> : null}
				</div>
			</div>
		);
	}
}

export default Index;
