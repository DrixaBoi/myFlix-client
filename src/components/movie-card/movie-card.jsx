import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Actors: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired,
    Release: PropTypes.string.isRequired,
    Imagepath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
