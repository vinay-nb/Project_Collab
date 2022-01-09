import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../../src/auth/Index";

class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }

    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    render() {
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
        if(this.props.for === "signup"){
            return (
                <GoogleLogin
                    clientId="570330481060-r2hhgqu5tl4f4ciklreia91jm20m12le.apps.googleusercontent.com"
                    buttonText="Signup with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            );
        } else {
            return (
                <GoogleLogin
                    clientId="570330481060-r2hhgqu5tl4f4ciklreia91jm20m12le.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            );
        }
        
    }
}

export default SocialLogin;
