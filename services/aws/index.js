const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

module.exports.addUserToPool = (info) => {
  const { email, password } = info
  const emailData = {
    Name: 'email',
    Value: email
  }
  const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(emailData)
  return new Promise((resolve, reject) => {
    global.userPool.signUp(email, password, [emailAttribute], null, (err, data) => {
      if (err) {
        console.log('inside', err);
        reject(err);
        return;
      }
      cognitoUser = data.user

      resolve(cognitoUser)
    })
  })
}

module.exports.loginUser = (info) => {
console.log('login cog',info)
  const loginDetails = {
    Username: info.email,
    Password: info.password
  }

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginDetails);

  const userDetails = {
    Username: info.email,
    Pool: global.userPool
  }

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userDetails);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: data => {
        console.log('inside promise', data)
        const tokens =  {
          idToken: data.getIdToken().getJwtToken(),
          refreshToken: data.getRefreshToken().getToken(),
          accessToken: data.getAccessToken().getJwtToken()
        }
        resolve(tokens)
      },
      onFailure: err => {
        reject(err)
      }
    })
  })
}