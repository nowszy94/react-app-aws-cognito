import React, { useState } from 'react';

import styles from './HomePage.module.css';
import UsersPool from '../users/userPool';

const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return 'PasswordsNotEqual';
    }
    if (!/\d/.text(password)) {
        return 'MissingNumberInPassword';
    }
    // TODO add full validation (has lowercase/uppercase letter)
};

const errorCodesMessages = {
    UsernameExistsException: 'Uzytkownik o podanym emailu juz istnieje. Wybierz inny',
    PasswordsNotEqual: 'Podane hasla różnią się',
    MissingNumberInPassword: 'Haslo powinno posiadać przynajmniej jedną cyfrę'
};

const translateErrorCode = (errorCode) => errorCodesMessages[errorCode] || 'Nieznany blad';

export default () => {
    const [email, setEmail] = useState('nowszy94@gmail.com');
    const [password, setPassword] = useState('Test1234');
    const [confirmPassword, setConfirmPassword] = useState('Test1234');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const passwordValidation = validatePassword(password, confirmPassword);

        if (passwordValidation) {
            setSuccess(false);
            setError(true);
            setErrorCode(passwordValidation);
        } else {
            UsersPool.signUp(email, password, [], null, (err, data) => {
                if (err) {
                    console.error(err);
                    setSuccess(false);
                    setError(true);
                    setErrorCode(err.code);
                } else {
                    console.log('Success', data);
                    setSuccess(true);
                    setError(false);
                }
            });
        }
    };

    return <div>
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                Email: <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /> <br />
                Password: <input
                    type="password"
                    value={password}
                    minLength={8}
                    onChange={(event) => setPassword(event.target.value)}
            /> <br />
                Confirm Password: <input
                    type="password"
                    value={confirmPassword}
                    minLength={8}
                    onChange={(event) => setConfirmPassword(event.target.value)}
            /> <br />
                <button type="submit">Register</button>
            </form>
            {error && <p className={styles.errorMessage}>Error: {translateErrorCode(errorCode)}</p>}
        </div>
    </div>;
}
