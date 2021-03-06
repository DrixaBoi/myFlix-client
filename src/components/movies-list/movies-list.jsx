import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import './movies-list.scss';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movie, visibilityFilter } = props;
  //let filteredMovies = movie;
  

  // if (visibilityFilter !== '') {
  //   filteredMovies = movie.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  // }

  if (!movie) return <div className="main-view" />;

return <>
  <Col key={movie._id}>
        <MovieCard className="movie-cards" movie={movie} />
      </Col>
  {/* {filteredMovies.map((m) => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))} */}
  </>;
}

export default connect(mapStateToProps)(MoviesList);
