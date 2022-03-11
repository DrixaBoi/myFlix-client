import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';
import Modal from 'react-bootstrap/Modal';



export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userDetails: [],
        validated: false,
        Username: '',
        Password: '',
        email: '',
        Birthdate: '',
        FavoriteMovies: [],
        modalState: false
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteUserDetails = this.deleteUserDetails.bind(this);
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
};

updateUserDetails(e) {
    const form = e.currentTarget.parentNode;
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ validated: true });
    } else {
        e.preventDefault();
        this.setState({ validated: true });
        axios.put(`https://drixflix.herokuapp.com/users/${user}`, {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.email,
            Birthday: this.state.Birthdate
        }, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            const data = response.data;
            localStorage.setItem('user', data.Username);
            window.open(`/users/${data.Username}`, '_self');
        }).catch(error => {
            console.log('error updating user details')
        });
    }
};
handleFieldChange(event) {
    let {name, value} = event.target;
    this.setState({ [name]: value})
}

showModal() {
    this.setState({ modalState: true });
}

closeModal() {
    this.setState({ modalState: false });
}

deleteUserDetails() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://drixflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(response => {
        const data = response.data;
        alert(user + " has been deleted");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
    }).catch(error => {
        console.log('error deleting the user');
    })
}

render() {
    const { movies, onBackClick} = this.props;

    let tempArray = this.state.FavoriteMovies;
    let FavoriteMoviesArray = [];
    FavoriteMoviesArray = movies.filter(movie => tempArray.includes(movie._id));

    return (
        <div className="profile_view">
            <Modal show={this.state.modalState} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete your user profile?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Once a user profile has been deleted, there is no way to restore it. Are you sure you wish to continue?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={this.deleteUserDetails}>
                        Delete Profile
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card id="card-top" className="card" bg="dark" text="light">
                <Card.Body className="card-top">
                    <Card.Title className="card-text">Welcome to your Personal Profile.</Card.Title>
                    <Card.Text><span className="profile_heading">User Name: </span>{this.state.userDetails.username}</Card.Text>
                    <Card.Text><span className="profile_heading">Email: </span>{this.state.userDetails.email}</Card.Text>
                    <Card.Text><span className="profile_heading">Birthday: </span>{this.state.userDetails.birthday}</Card.Text>

                    {this.state.userDetails.Birthdate && (
                        <Card.Text><span className="profile_heading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(this.state.userDetails.Birthdate))}</Card.Text>
                    )}
                </Card.Body>
            </Card>

            <Card className="card" bg="dark" text="light">
                <Card.Body className="card-body">
                    <Card.Title className="text-center">Change or Update Profile Information</Card.Title>

                    <Form noValidate validated={this.state.validated}>
                        <Form.Group controlId="updateFormUsername">
                            <Form.Label>Username:</Form.Label>

                            <Form.Control name="Username" type="text" onChange={this.handleFieldChange} required />

                            <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="updateFormPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control name="Password" type="password" onChange={this.handleFieldChange} required />
                            <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="updateFormEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control name="email" type="email" onChange={this.handleFieldChange} required />
                            <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="updateDateOfBirth">
                            <Form.Label>Date of Birth:</Form.Label>
                            <Form.Control name="Birthdate" type="date" onChange={this.handleFieldChange} />
                        </Form.Group>


                        <Button className="profile-button" variant="outline-primary" type="submit" onClick={this.updateUserDetails}>
                            Update Details
                        </Button>

                        <Button className="profile-button" onClick={() => onBackClick(null)} variant="outline-primary">Back</Button>

                        <Button className="profile-button" variant="outline-primary" onClick={this.showModal}>
                            Delete User Profile
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="card" bg="dark" text="light" align="center" style={{ color: "white" }}>
                <Card.Title className="card-text">Favorite Movies:</Card.Title>
            <Row>

                {FavoriteMoviesArray.map(movie => (
                    <Col md={4} key={movie._id} className="my-2">
                        <MovieCard movie={movie} />
                    </Col>))}
            </Row>
            </Card>
        </div>
    );
}
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
          ImagePath: PropTypes.string,
          Title: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired,
          Genre: PropTypes.shape({
              Name: PropTypes.string,
              Description: PropTypes.string
          }),
          Director: PropTypes.shape({
              Name: PropTypes.string,
              Bio: PropTypes.string,
              Birthyear: PropTypes.string,
              Deathyear: PropTypes.string
          }),
      })
  ),
  onBackClick: PropTypes.func.isRequired
  };