import gql from 'graphql-tag';

const deleteMovie = gql`
  mutation DeleteMovie($id: ID) {
    deleteMovie(id: $id) {
      id
      title
    }
  }
`;

export default deleteMovie;
