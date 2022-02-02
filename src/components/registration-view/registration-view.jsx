import React, { useState } from 'react';
import PropTypes from "prop-types";

import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ Birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, Birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration(username);
  };

  return (
    <Container>
      <Row>
          <Col>
              <CardGroup>
                  <Card>
                      <Card.Body>
                          <Card.Title>Register new account.</Card.Title>
                          <Form>
                              <Form.Group>
                                  <Form.Label>Username:</Form.Label>
                                  <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                                  //validation error here
                                  {usernameErr && <p>{usernameErr}</p>}
                              </Form.Group>

                              <Form.Group>
                                  <Form.Label>Password:</Form.Label>
                                  <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} minlength="8" placeholder="Your password must be 8 or more characters" />
                                  //validation error here
                                  {passwordErr && <p>{passwordErr}</p>}
                              </Form.Group>

                              <Form.Group>
                                  <Form.Label>Email:</Form.Label>
                                  <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                                  //validation error here
                                  {emailErr && <p>{emailErr}</p>}
                              </Form.Group>

                              <Form.Group>
                                  <Form.Label>Birthday:</Form.Label>
                                  <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter birthday" />
                              </Form.Group>

                              <Button variant="outline-light" type="submit" onClick={handleSubmit}>Submit</Button>
                          </Form>
                      </Card.Body>
                  </Card>
              </CardGroup>
          </Col>
      </Row>
    </Container>
  );
}
