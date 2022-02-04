import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap';
import { Menubar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UserUpdate } from '../profile-view/update-view';
import './main-view.scss';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
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

  getMovies(token) {
    axios.get('https://drixflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //assign result to state
      this.setState({
        movies:response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    axios.get('https://drixflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Menubar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact Path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length ===0) return <div className="mainview">

              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to ="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />
            <Route path="movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
            }} />
            <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackclick={() => history.goBack()} />
            </Col>
            }} />
            <Route path="/genres/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackclick={() => history.goBack()} />
            </Col>
            }} />
            <Route path={`/users/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
              return <Col>
              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()}/>
              </Col>
            }} />
            <Route path={`/user-update/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
              return <Col>
              <UserUpdate user={user} onBackClick={() => history.goBack()}/>
              </Col>
            }} />
        </Row>
      </Container>
    </Router>
   );
 }
}
