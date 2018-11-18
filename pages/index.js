import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import lunr from 'lunr';
import { DebounceInput } from 'react-debounce-input';

import search_index from '../static/data/search_index.json';
import search_store from '../static/data/search_store.json';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lunr: lunr.Index.load(search_index)
    };
  }

  render() {
    const result = this.state.lunr.search(this.props.query);
    return <div>{result.map(this.props.children)}</div>;
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'ariel'
    };
  }

  render() {
    return (
      <>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={e => this.setState({ query: e.target.value })}
          value={this.state.query}
        />
        <div>
          <Search query={this.state.query}>
            {result =>
              search_store[result.ref] && (
                <img
                  key={result.ref}
                  width="100"
                  height="75"
                  src={`/static/photos/${search_store[result.ref].jpeg}`}
                />
              )
            }
          </Search>
        </div>
      </>
    );
  }
}
