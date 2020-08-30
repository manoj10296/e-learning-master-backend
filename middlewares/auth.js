 const {
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
  CognitoUserSession,
  CognitoUser
 } = require('amazon-cognito-identity-js')

 const User = require('../models/User')
 const jwt = require('jwt-decode')

 

 module.exports.auth = async (info) => {
  return new Promise((resolve) => {
    const {
      headers: {
          idtoken, accesstoken, refreshtoken
      } = info
    }

    if(idtoken && accesstoken && refreshtoken) {
      const decoded = jwt(idtoken)
      const username = decoded['cognito:username']

       const idToken = new CognitoIdToken({
         IdToken: idtoken
       })

       const accessToken = new CognitoAccessToken({
         AccessToken: accesstoken
       })

       const refreshToken = new CognitoRefreshToken({
         RefreshToken: refreshtoken
       })

       const tokenData = {
         IdToken: idToken,
         RefreshToken: refreshToken,
         AccessToken: accessToken
       }

       const session = new CognitoUserSession(tokenData)

       const userData = {
         UserName: username,
         Pool: global.userPool
       }

       const cognitoUser = new CognitoUser(userData)
       cognitoUser.signInUserSession = session

       //TODO 
      //  if(session.isValid()) {
      //   // const userResult = await User.findOne
      //  }
    }
    
  }) 
 }