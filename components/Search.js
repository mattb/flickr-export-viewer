import React from 'react';
import 'isomorphic-fetch';
import lunr from 'lunr';
import PropTypes from 'prop-types';

import search_index from '../static/data/search_index.json';
import search_store from '../static/data/search_store.json';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: lunr.Index.load(search_index)
    };
  }

  render() {
    const { index } = this.state;
    const { query, children } = this.props;
    if (query === '') {
      return <div />;
    }
    const result = index
      .search(query)
      .filter(r => search_store[r.ref] !== undefined)
      .map(r => {
        const { jpeg, height, width, id, date } = search_store[r.ref];
        return {
          src: `static/photos/${jpeg}`,
          date,
          key: id,
          width,
          height
        };
      });
    result.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (b.date > a.date) {
        return 1;
      }
      return 0;
    });
    return children(result);
  }
}

Search.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};
