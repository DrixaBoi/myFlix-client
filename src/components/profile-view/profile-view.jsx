import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null ,
      Email: null,
      Birthday: null,
      Favorites: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUserInfo(accessToken);
  }

  getUserInfo(token) {
    const username = localStorage.getItem("user");
    axios.get(`https://drixflix.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        Username: response.data.Username,
        Favorites: this.props.movies.filter((m) =>
          response.data.FavoriteMovies.includes(m._i)
        ),
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user:null,
    });
    window.open('/', '_self');
  }

  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    console.log(username)
    const token = localStorage.getItem('token');
    console.log(this.props)
    axios.delete(`https://drixflix.herokuapp.com/user/favorites/delete/${username}/movies/${movie._id}`,
    { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser() {
    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
        axios.delete( `https://drixflix.herokuapp.com/user/delete/${user}`,
          { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            alert(user + " has been deleted.");
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.pathname = "/";
          })
          .catch(function (error) {
              console.log(error);
          })};
      }

      editUser(e) {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://drixflix.herokuapp.com/user/update/${username}`,
          {
            Name: this.state.Name,
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday
          },
          { headers: { Authorization: `Bearer ${token}` }
          })
          .then((response) => {
            this.setState({
              Name: response.data.Name,
              Username: response.data.Username,
              Password: response.data.Password,
              Email: response.data.Email,
              Birthday: response.data.Birthday
            });
            localStorage.setItem('user', response.data.Username);
            const data = response.data;
            console.log(data);
            console.log(this.state.Username);
            alert('Profile updated');
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      setName(value) {
        this.state.Name = value;
      }

      setUsername(value) {
        this.state.Username = value;
      }

      setPassword(value) {
        this.state.Password = value;
      }

      setEmail(value) {
        this.state.Email = value;
      }

      setBirthday(value) {
        this.state.Birthday = value;
      }


   render() {
    const { name, username, email, birthday, favorites  } = this.props
console.log(this.props)

    return(
      <Container className="UserView">
        <Row className="justify-content-md-center">
          <Col>
          <div>
            <h1>Your profile</h1>
          </div>
            <p>Name: {name}</p>
            <p>Username: {username}</p>
            <p>Password: *******</p>
            <p>Email: {email}</p>
            <p>Birthday: {birthday}</p>
          </Col>
        </Row>
          <div className="profileInformation">
          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
          <div>
            <h3>Edit your profile</h3>
          </div>
          <Form.Group>
              Name
              <Form.Control type='text' name="Name" placeholder="New Name" onChange={(e) => this.setName(e.target.value)} />
            </Form.Group>

            <Form.Group>
              Username
              <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group>
              Password
              <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

            </Form.Group>
            <div className="marginSpacer">
              <Button variant="success" type="submit" >Update</Button>
            </div>
          </Form>
          </div>
          <Row>
            <Col className="acc-btns mt-1">
              <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
            </Col>
         </Row>

          <h3 className="favorite-Movies-title">Favorite Flix</h3>

        <Row className="favoriteMovied-col">
          { favorites && favorites.map((movie) => (
            <Col sm={6} md={4} lg={4} key={movie._id}>
              <div className="favoriteMoviediv" >
                <MovieCard movie={movie} />
                <Button bg="danger" variant="danger" className="unfav-button" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>
                  Delete From Favorites
                </Button>
                </div>
            </Col>
          ))
        }
      </Row>
     </Container>
    )
   }
}
