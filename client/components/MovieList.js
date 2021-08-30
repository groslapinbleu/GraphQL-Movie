import React, { useContext } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';
import deleteMovie from '../queries/deleteMovie';
import readMovies from '../queries/readMovies';

const MovieList = ({ readMovies, deleteMovie }) => {
  const movies = readMovies.movies;
  const loading = readMovies.loading;

  const onDeleteMovie = (id) => {
    console.log('deleteMovie with id=' + id);
    deleteMovie({
      variables: {
        id,
      },
    })
      .then(() => {
        readMovies.refetch();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>Collection de films</h1>
      {loading ? (
        <p>Chargement en cours</p>
      ) : (
        <ul className='collection'>
          {movies.map((movie) => (
            <li className='collection-item' key={movie.id}>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
              <i
                className='material-icons secondary-content cursor_on_button'
                onClick={() => {
                  onDeleteMovie(movie.id);
                }}
              >
                delete
              </i>
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

export default compose(
  graphql(readMovies, {
    name: 'readMovies',
  }),
  graphql(deleteMovie, {
    name: 'deleteMovie',
  })
)(MovieList);
