import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movieContainer">
        <Row>
          <Col>
              <div className="movie-view">
                <div className="movie-poster">
                  <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                  <span className="label">Title: </span>
                  <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                  <span className="label">Description: </span>
                  <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-director">
                  <span className="label">Director: </span>
                  <span className="value">{movie.Director.Name}</span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                </div>
                <div className="movie-genre">
                  <span className="label">Genre: </span>
                  <span className="value">{movie.Genre.Name}</span>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                </div>
                <div className="movie-actors">
                  <span className="label">Actors: </span>
                  <span className="value">{movie.Actors}</span>
                </div>
                <Button variant="outline-primary" onClick={() => onBackClick(null)}>Back</Button>
              </div>
            </Col>
          </Row>
        </Container>
    );
  }
}
