import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import GolfFinder from './containers/GolfFinder/GolfFinder';
import CourseDetails from './containers/CourseDetails/CourseDetails';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
          <Route path="/" exact component={GolfFinder} />
          <Route path="/course/:slug/:id" component={CourseDetails} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
