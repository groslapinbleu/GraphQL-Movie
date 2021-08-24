import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const MovieList = ({ data }) => {
  console.log(data);
  const movies = data.movies;
  const loading = data.loading;
  return (
    <div>
      <h1>Collection de films</h1>
      {loading ? (
        <p>Chargement en cours</p>
      ) : (
        <ul className='collection'>
          {movies.map((movie) => (
            <li className='collection-item' key={movie.id}>
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const query = gql`
  {
    movies {
      id
      title
    }
  }
`;

export default graphql(query)(MovieList);
