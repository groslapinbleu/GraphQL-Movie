import React from 'react';
import { graphql, compose } from 'react-apollo';
import readMovie from '../queries/readMovie';

const MovieDetails = (props) => {
  console.log(props);
  const id = props.params.id;
  const readMovieData = props.readMovie;
  return (
    <div>
      MovieDetails {id}
      {readMovieData.loading ? (
        'Chargement en cours'
      ) : (
        <div>Title: {readMovieData.movie.title}</div>
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
