import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import UsersPool from '../users/userPool';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UsersPool
        });
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: data => {
                console.log("onSuccess:", data);
            },

            onFailure: err => {
                console.error("onFailure:", err);
            },

            newPasswordRequired: data => {
                console.log("newPasswordRequired:", data);
            }
        });
    };

    return <div>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
            Email: <input type="email" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
            Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
            <button type="submit">Sign in</button>
        </form>
    </div>;
}
