import React, { useState } from 'react';

import UsersPool from '../users/userPool';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        UsersPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Success', data)
            }
        });
    };

    return <div>
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                Email: <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /> <br/>
                Password: <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /> <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>;
}
