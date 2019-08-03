import React from "react";
import axios from "axios";

import Login from "../pages/login";

const withAuthorization = (WrappedComponent: any) => {
	return class extends React.Component {
		public state = {
			isAuthorized: false,
			isBrowser: typeof window !== "undefined",
		};

		public async componentDidMount() {
			try {
				console.log("COMP DID MOUNT");
				axios
					.get("/api/users/isAdmin", {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						timeout: 5000,
					})
					.then(res => {
						console.log("RESPONSE STATUS", res.status);
						console.log("TOKEN", localStorage.getItem("token"));

						if (res.status === 204 || res.status === 304) {
							this.setState({
								...this.state,
								isAuthorized: true,
							});
						}
					});
			} catch (err) {
				console.log("[ERROR]", err);
			}
		}

		public render = () => {
			return this.state.isBrowser && this.state.isAuthorized ? (
				<WrappedComponent {...this.props} />
			) : (
				<Login />
			);
		};
	};
};

export default withAuthorization;
