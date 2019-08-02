import React from "react";
import axios from "axios";

import Login from "../pages/login";

const withAuthorization = (WrappedComponent: any) => {
	return class extends React.Component {
		public state = {
			isAuthorized: false
		};

		public componentDidMount = async () => {
			try {
				await axios.get(`${process.env.BASE_URL}/api/users/userIsAuthenticated`);
				console.log("USER IS AUTHENTICATED", "STATE PRE: ", this.state);
				this.setState({
					...this.state,
					isAuthorized: true
				});
				console.log("STATE AFTER", this.state);
			} catch (err) {
				console.log("[ERROR]", err);
			}
		}

		public render = () => (this.state.isAuthorized ? <WrappedComponent {...this.props} /> : <Login />);
	};
}

export default withAuthorization;
