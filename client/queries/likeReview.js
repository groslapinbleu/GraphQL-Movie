import gql from 'graphql-tag';

const likeRewiew = gql`
  mutation LikeReview($id: ID) {
    likeReview(id: $id) {
      id
      likes
    }
  }
`;

export default likeRewiew;
