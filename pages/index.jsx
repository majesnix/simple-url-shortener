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
			ratelimit: false,
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
			if (error.response.status === 429) {
				this.setState({
					ratelimit: true,
					shortURL: null,
				});
			}
			this.setState({
				err: true,
				shortURL: null,
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
						fontSize: '1.5rem'
					}}
				>
					<Link href={{ pathname: '/login' }}><div style={{ position: 'absolute', right: '0', top: '0', margin: '1.5rem 1.5rem 0 0', color: '#FBFBFB', textDecoration: 'none', cursor: 'pointer' }}>Admin</div></Link>
					<Link href={{ pathname: '/apidocs' }}><div style={{ position: 'absolute', right: '7.5rem', bottom: '0', margin: '0 1.5rem 1.5rem 0', color: '#FBFBFB', textDecoration: 'none', cursor: 'pointer' }}>Api</div></Link>
					<Link href={{ pathname: '/terms' }}><div style={{ position: 'absolute', right: '0', bottom: '0', margin: '0 1.5rem 1.5rem 0', color: '#FBFBFB', textDecoration: 'none', cursor: 'pointer' }}>Terms</div></Link>
					<h1>{process.env.BASE_URL}</h1>
					<form style={{ marginLeft: '1.5rem', marginTop: '1.5rem' }}>
						<input
							type="text"
							id="url"
							placeholder="Enter URL here..."
							value={this.state.url}
							onChange={evt => this.handleChange(evt)}
							style={{ marginRight: '1.5rem', height: '4rem', fontSize: '1.8rem', width: '25rem' }}
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
						<div style={{ marginTop: '1.5rem' }}>
							{this.state.shortURL}
						</div>
					) : null}
					{this.state.ratelimit && <div>You send to many requests, please wait 60 minutes</div>}
					{this.state.err && <div>Something went wrong</div>}
				</div>
			</div>
		);
	}
}

export default Index;
