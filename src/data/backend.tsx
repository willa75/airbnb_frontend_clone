import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import gql from 'graphql-tag';
import { MyProfile } from '../types/profile';

const client = generateClient();

export const getMyProfile = async () => {
  const result: GraphQLResult<any> = await client.graphql({
    query: gql`
      query getMyProfile {
        getMyProfile {
          id
          name
          screenName
          imageUrl
          reviews
          reservations
          listings
          rating
          favorites
        }
      }
    `,
    authMode: "userPool"
  });
  const profile = result.data?.getMyProfile as MyProfile;

  profile.imageUrl = profile.imageUrl || '/images/placeholder.jpg';
  return profile;
};