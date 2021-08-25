import gql from 'graphql-tag';

const readMovies = gql`
  {
    movies {
      id
      title
    }
  }
`;

export default readMovies;
