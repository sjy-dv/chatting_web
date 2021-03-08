import React from 'react';
import { Route } from 'react-router-dom';
import Router from './containers';
import Element from './components';

class App extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <Element.AppBar />
          <Route exact path="/" component={Router.Sign} />
          <Element.Footer />
        </div>
      </>
    );
  }
}

export default App;
