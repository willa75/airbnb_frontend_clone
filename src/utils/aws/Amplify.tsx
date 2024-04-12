import {Amplify} from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.REACT_APP_AWS_COGNITO_POOL_ID,
      userPoolClientId: import.meta.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
      allowGuestAccess: true,
      identityPoolId: import.meta.env.REACT_APP_AWS_COGNITO_GUEST_IDENTITY_POOL_ID,
      loginWith: {
        oauth: {
          domain: '',
          scopes: ['email', 'openid', 'profile',],
          providers: ['Facebook', 'Google'],
          redirectSignIn: ['http://localhost:3000/'],
          redirectSignOut: ['http://localhost:3000/'],
          responseType: 'token',
        }
      }
    }
  },
  API: {
    GraphQL: {
      endpoint: import.meta.env.REACT_APP_AWS_GRAPHQL_ENDPOINT,
      defaultAuthMode: 'userPool',
    }
  }
});
