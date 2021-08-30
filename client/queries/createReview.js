import gql from 'graphql-tag';

const createReview = gql`
  mutation AddReviewToMovie($movieId: ID, $content: String) {
    addReviewToMovie(movieId: $movieId, content: $content) {
      id
      title
      reviews {
        id
        content
        likes
      }
    }
  }
`;

export default createReview;
