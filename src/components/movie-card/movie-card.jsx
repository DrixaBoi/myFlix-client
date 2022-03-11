import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Card bg="dark" border="primary" className="movie-card">
        <Card.Body className="movie-card-body">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="card-text">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
           <Button variant="outline-primary">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//       Death:PropTypes.string.isRequired,
//     }).isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }).isRequired,
//     Actors: PropTypes.string.isRequired,
//     Imagepath: PropTypes.string.isRequired
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired
// };
