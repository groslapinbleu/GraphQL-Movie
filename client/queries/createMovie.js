import gql from 'graphql-tag';

const createMovie = gql`
  mutation AddMovie($title: String) {
    addMovie(title: $title) {
      id
      title
    }
  }
`;

export default createMovie;
