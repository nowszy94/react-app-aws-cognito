import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'eu-central-1_9P2KXqzCX',
    ClientId: '45nkuog8e3fjmtcntn90pr5lr0'
};

const UsersPool = new CognitoUserPool(poolData);

export default UsersPool;
