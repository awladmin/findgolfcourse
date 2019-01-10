import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import GolfFinder from './containers/GolfFinder/GolfFinder';
import CourseDetails from './containers/CourseDetails/CourseDetails';
import CountiesDisplay from './containers/CountiesDisplay/CountiesDisplay';
import SignUp from './containers/SignUp/SignUp';
import Browse from './containers/Browse/Browse';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={GolfFinder} />
            <Route path="/Browse" exact component={Browse} />
            <Route path="/course/:slug/:id" component={CourseDetails} />
            <Route path="/county/:county" component={CountiesDisplay} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
