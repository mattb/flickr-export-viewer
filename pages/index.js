import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import Gallery from 'react-photo-gallery';
import { Router } from '../routes';
import Search from '../components/Search';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  render() {
    const { query } = this.state;
    return (
      <>
        Search:{' '}
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={e => this.setState({ query: e.target.value })}
          value={query}
        />
        <div>
          <Search query={query}>
            {photos => (
              <Gallery
                photos={photos}
                onClick={(_, index) =>
                  Router.pushRoute(`/photo/${index.photo.key}`)
                }
              />
            )}
          </Search>
        </div>
      </>
    );
  }
}
