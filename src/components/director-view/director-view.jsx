import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import "./director-view.scss";

 export function DirectorView (props)  {
  const { director } = props;
  console.log (director);
  return (
    <div className="director-view">
       <div className="director-name">
         <span className="label">Name: </span>
         <span className="value">{director.Name}</span>
       </div>
       <div className="director-bio">
         <span className="label">Biography: </span>
         <span className="value">{director.Bio}</span>
       </div>
       <div className="director-birthyear">
         <span className="label">Year of Birth: </span>
         <span className="value">{director.Born}</span>
       </div>

       <Link to={`/`}>
         <Button className='returnButton' variant='dark'>Return to Movie List</Button>
       </Link>
    </div>
  )
}
