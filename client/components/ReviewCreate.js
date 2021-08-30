import React, { Component } from 'react';
import createReview from '../queries/createReview';
import readMovie from '../queries/readMovie';
import { graphql, compose } from 'react-apollo';

class ReviewCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props
      .createReview({
        variables: {
          movieId: this.props.movieId,
          content: this.state.content,
        },
        refetchQueries: [
          {
            query: readMovie,
            variables: {
              id: this.props.movieId,
            },
          },
        ], // force la réexécution de readMovie
      })
      .then(() => {
        this.setState({ content: '' });
      });
  }
  handleChange(event) {
    this.setState({ content: event.target.value });
  }
  render() {
    //console.log(this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Contenu :
              <input
                type='text'
                placeholder='Tapez un contenu'
                value={this.state.content}
                onChange={this.handleChange}
              />
            </label>
            <input type='submit' value='Envoyer' />
          </div>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(createReview, {
    name: 'createReview',
  })
)(ReviewCreate);
