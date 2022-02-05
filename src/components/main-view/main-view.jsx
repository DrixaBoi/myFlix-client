import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Container, Row, Col, Button } from 'react-bootstrap';
import { Menubar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get(`https://drixflix.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //assign result to state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <Menubar user={user} />
                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) {
                                return <Redirect to="/" />;
                            }

                            return (
                                <>
                                    {movies.map(movie => (
                                        <Col md={3} key={movie._id}>
                                            <MovieCard movie={movie} onMovieClick={() => {}} />
                                        </Col>
                                    ))}
                                </>
                            );
                        }} />
                        <Route path="/login" render={() => {
                            if (user) {
                                return <Redirect to="/" />;
                            }

                            return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                        }} />
                        <Route path="/register" render={() => {
                            if (user) {
                                return <Redirect to="/" />;
                            }

                            return (
                                <Col>
                                    <RegistrationView />
                                </Col>
                            );
                        }} />
                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }

                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }

                            return (
                                <Col md={8}>
                                    <MovieView
                                        movie={movies.find(m => m._id === match.params.movieId)}
                                        onBackClick={() => history.goBack()} />
                                </Col>
                            );
                        }} />
                        <Route path="/profile" render={({ history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }

                            return (
                                <Col md={8}>
                                    <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                                </Col>
                            );
                        }} />
                        <Route path="/genres/:name" render={({ match, history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }


                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }

                            return (
                                <Col md={8}>
                                    <GenreView
                                        genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                                        onBackClick={() => history.goBack()}
                                        movies={movies.filter(movie => movie.Genre.Name === match.params.name)}/>
                                </Col>
                            )
                        }} />
                        <Route path="/directors/:name" render={({ match, history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }

                            if (movies.length === 0) return <div className="main-view" />;

                            return (
                                <Col md={8}>
                                    <DirectorView
                                        director={movies.find(m => m.Director.Name === match.params.name).Director}
                                        onBackClick={() => history.goBack()}
                                        movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
                                </Col>
                            );
                        }} />
                    </Row>
                </Container>
            </Router>
        );
    }
}
