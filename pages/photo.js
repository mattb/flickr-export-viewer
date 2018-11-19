import PropTypes from 'prop-types';
import React from 'react';

const Photo = ({ url }) => <p>{url.query.id}</p>;

Photo.propTypes = {
  url: PropTypes.shape({
    query: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

export default Photo;
