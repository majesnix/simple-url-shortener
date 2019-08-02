import React from "react";
import axios from "axios";

import Login from "../pages/login";

const withAuthorization = (WrappedComponent: any) => {
	return class extends React.Component {
		public state = {
			isAuthorized: false,
		};

		public componentDidMount = async () => {
			try {
				const res = await axios.get("/api/users/isAdmin", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					timeout: 5000,
				});

				if (res.status === 204 || res.status === 304) {
					this.setState({
						...this.state,
						isAuthorized: true,
					});
				}
			} catch (err) {
				console.log("[ERROR]", err);
			}
		}

		public render = () => {
			return this.state.isAuthorized ? (
				<WrappedComponent {...this.props} />
			) : (
				<Login />
			);
		}
	};
};

export default withAuthorization;
