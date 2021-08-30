import React from 'react';
import { graphql, compose } from 'react-apollo';
import readMovie from '../queries/readMovie';
import { Link } from 'react-router';
import ReviewCreate from './ReviewCreate';

const MovieDetails = (props) => {
  console.log(props);
  const id = props.params.id;
  const readMovieData = props.readMovie; // j'utilise un autre nom que readMovie sinon javascript se mélange avec la query graphQL nommée readMovie
  return (
    <div>
      MovieDetails {id}
      {readMovieData.loading ? (
        'Chargement en cours'
      ) : (
        <div>
          <h1>Title: {readMovieData.movie.title}</h1>
          <Link to='/movies'>Retour à la liste des films</Link>
          <ul className='collection'>
            {readMovieData.movie.reviews.map((review) => (
              <li className='collection-item' key={review.id}>
                {review.content}
              </li>
            ))}
          </ul>
          <ReviewCreate movieId={id} />
        </div>
      )}
    </div>
  );
};

export default compose(
  graphql(readMovie, {
    name: 'readMovie',
    options: (props) => {
      return {
        variables: {
          id: props.params.id,
        },
      };
    },
  })
)(MovieDetails);
