import React from "react";
import * as config from '../utils/config'
import UserInfo from "./userinfo";
import './dashboard.css'

const LIMIT = 10;

export default class Dashboard extends React.Component {

    constructor() {
        super()
        this.users = []
        this.state = {
            isLoading: false,
            filterUsers: []
        }
    }

    //first time called
    componentDidMount() {
        this.getuserDetails()
    }

    //perform validation on API call
    validateResponse = (errored, response) => {
        if (errored || (!response.length && !response.message)) {
            alert.show(
                "Could not fetch records!"
            );
            return false;
        }

        if (!response.length) {
            alert.show(response.message || "No records found in database");
            return false;
        }

        return true;
    };

    //perform API call and get JSON response
    performAPICall = async () => {
        let response = {}
        let errored = false;

        this.setState({ isLoading: true })

        try {
            response = await (await fetch(`${config.endpoint_URL}`)).json();
        } catch (e) {
            errored = true;
        }

        this.setState({
            loading: false,
        });

        if (this.validateResponse(errored, response)) {
            return response;
        }
    }

    //set state based on api response
    getuserDetails = async () => {
        let response = await this.performAPICall()
        if (response) {
            this.users = response
            this.setState({ filterUsers: response.slice(0, LIMIT) })
        }
    }

    render() {
        return (
            <div className="container">
                {this.users.length !== 0 ? (
                        <UserInfo users={this.users} />
                    ) : this.state.loading ? (
                        <div className="loading-text">Loading users...</div>
                    ) : (
                        <div className="loading-text">No users found</div>
                    )}
            </div>
        )
    }

}

