import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import readMovies from '../queries/readMovies';

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
      <Link
        to='/movies/create'
        className='btn-floating btn-large waves-effect waves-light blue right'
      >
        <i className='material-icons'>add</i>
      </Link>
    </div>
  );
};

export default graphql(readMovies)(MovieList);
