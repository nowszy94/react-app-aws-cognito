import React, { useState } from 'react';

import styles from './HomePage.module.css';
import UsersPool from '../users/userPool';

const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return 'PasswordsNotEqual';
    }
    if (!/\d/.test(password)) {
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
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('nowszy94@gmail.com');
    const [password, setPassword] = useState('Test1234');
    const [confirmPassword, setConfirmPassword] = useState('Test1234');
    const [verificationCode, setVerificationCode] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(null);

    const handleRegisterSubmit = (event) => {
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
                    setUser(data.user)
                }
            });
        }
    };

    const handleVerificationSubmit = (event) => {
        event.preventDefault();

        user.confirmRegistration(verificationCode, false, (err, data) => {
            if (err) {
                console.error('Error while confirm account', err)
            } else {
                console.log('Success', data);
            }
        });
    };

    return <div>
        <div>
            <h2>{!success ? 'Register' : 'Confirm Registration'}</h2>
            {!success && <form onSubmit={handleRegisterSubmit}>
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
            </form>}
            {success && <form onSubmit={handleVerificationSubmit}>
                Code: <input type="text" value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} /> <br />
                <button type="submit">Submit</button>
            </form>}
            {error && <p className={styles.errorMessage}>Error: {translateErrorCode(errorCode)}</p>}
        </div>
    </div>;
}
