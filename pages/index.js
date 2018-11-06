import React from 'react';
import 'isomorphic-fetch';
import { Lunr } from 'react-lunr';
import { Formik } from 'formik';
import search_index from '../static/data/search_index.json';
import search_store from '../static/data/search_store.json';

const index = JSON.stringify(search_index);
const store = JSON.stringify(search_store);

export default class extends React.Component {
  render() {
    return (
      <Lunr index={index} store={store}>
        {({ results, setQuery }) => {
          console.log(results);
          return (
            <>
              <Formik
                initialValues={{ query: '' }}
                onSubmit={(values, { setSubmitting }) => {
                  setQuery(values.query);
                  setSubmitting(false);
                }}
                render={({
                  values,
                  handleSubmit,
                  handleChange,
                  handleBlur
                }) => (
                  <form onSubmit={handleSubmit}>
                    <input
                      name="query"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.query}
                    />
                  </form>
                )}
              />
              <h1>Results</h1>
              <ul>
                {results.map(result => (
                  <li key={result.id}>
                    foo
                    {result.name}
                    bar
                  </li>
                ))}
              </ul>
            </>
          );
        }}
      </Lunr>
    );
  }
}
