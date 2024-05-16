import {Amplify} from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_COGNITO_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_APP_CLIENT_ID,
      allowGuestAccess: true,
      identityPoolId: import.meta.env.VITE_AWS_COGNITO_GUEST_IDENTITY_POOL_ID,
      loginWith: {
        oauth: {
          domain: '',
          scopes: ['email', 'openid', 'profile',],
          providers: ['Facebook', 'Google'],
          redirectSignIn: ['http://127.0.0.1:5173/'],
          redirectSignOut: ['http://127.0.0.1:5173/'],
          responseType: 'token',
        }
      }
    }
  },
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_AWS_GRAPHQL_ENDPOINT,
      defaultAuthMode: 'userPool',
    }
  }
});
