import React from 'react';
import { graphql, compose } from 'react-apollo';
import readMovie from '../queries/readMovie';
import { Link } from 'react-router';
import likeReview from '../queries/likeReview';
import ReviewCreate from './ReviewCreate';

const MovieDetails = (props) => {
  console.log(props);
  const id = props.params.id;
  const readMovieData = props.readMovie; // j'utilise un autre nom que readMovie sinon javascript se mélange avec la query graphQL nommée readMovie
  const stars = (likes) => {
    const ret = [];
    for (let i = 0; i < likes; i++) {
      ret.push(
        <i className='material-icons secondary-content' key={i}>
          star
        </i>
      );
    }
    return ret;
  };
  const onClickThumb = (id, currentLikes) => {
    props.likeReview({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeReview: {
          id: id,
          __typename: 'ReviewType',
          likes: currentLikes + 1,
        },
      },
    });
  };
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
                <i
                  className='material-icons secondary-content cursor_on_button'
                  onClick={() => {
                    onClickThumb(review.id, review.likes);
                  }}
                >
                  thumb_up
                </i>
                {stars(review.likes).map((star) => {
                  return star;
                })}
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
  }),
  graphql(likeReview, {
    name: 'likeReview',
  })
)(MovieDetails);
