import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

        FavoriteMovies: [],
        userDetails: []
    }


    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
}


componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
}


getUserDetails(token) {
    axios.get(`https://drixflix.herokuapp.com/users/${this.props.user}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(response => {

        this.setState({
            userDetails: response.data,
            FavoriteMovies: response.data.FavoriteMovies
        });
    }).catch(function(error) {
        console.log(error);
    });
}


addFavorite() {
    let token = localStorage.getItem('token');

    axios.post(`https://drixflix.herokuapp.com/users/${this.props.user}/movies/${this.props.movie._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(response => {

        window.open(`/movies/${this.props.movie._id}`, '_self');
    }).catch(function(error) {
        console.log(error);
    });
}


removeFavorite() {
    let token = localStorage.getItem('token');
    axios.delete(`https://drixflix.herokuapp.com/users/${this.props.user}/movies/${this.props.movie._id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(response => {

        window.open(`/movies/${this.props.movie._id}`, '_self');
    }).catch(function(error) {
        console.log(error);
    });
}

  render() {
    const { movie, onBackClick } = this.props;
    let tempArray = this.state.FavoriteMovies;
    let isFavoriteNew = false
    if (tempArray.includes(this.props.movie._id)) {
        isFavoriteNew = true;
    } else {
        isFavoriteNew = false;
    };

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
                  <span className="label-button">Director: </span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link"><span className="moviebutton">{movie.Director.Name}</span></Button>
                  </Link>
                </div>
                <div className="movie-genre">
                  <span className="label-button">Genre: </span>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link"><span>{movie.Genre.Name}</span></Button>
                  </Link>
                </div>
                <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                {isFavoriteNew ? (
                  <Button className="float-right" variant="outline-primary" onClick={this.removeFavorite}>
                     Remove from Favorites
                  </Button>
                     ) : 
                     (
                  <Button className="float-right" variant="outline-primary" onClick={this.addFavorite}>
                     Add to Favorites
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
    );
  }
}
