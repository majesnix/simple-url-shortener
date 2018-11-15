import React from 'react';
import Axios from 'axios';
import Meta from '../components/meta.jsx';

const handleSubmit = evt => {
	evt.preventDefault();
	Axios.post();
};

const Index = () => (
	<div
		style={{
			height: '100vh'
		}}
	>
		<Meta />
		<div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height: '100%'}}>
			<h1>dcl.re</h1>
			<form style={{ marginLeft: '15px'}}>
				<input type="text" placeholder="Enter URL here..." style={{ marginRight: '15px' }}/>
				<button style={{ padding: '5px', borderRadius: '15px' }}onClick={evt => handleSubmit(evt)}>Shorten</button>
			</form>
		</div>
	</div>
);

export default Index;
