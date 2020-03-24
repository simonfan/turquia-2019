import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { PhotoGallery } from '../PhotoGallery/PhotoGallery'

const ROUTER_BASE_PATH = process.env.REACT_APP_ROUTER_BASE_PATH

export const App = ({
  galleries
}) => (
  <Router>
    <Switch>
      {galleries.map(([id, sections], index) => (
        <Route path={`/${id}`} key={id}>
          <PhotoGallery sections={sections} />
        </Route>
      ))}

      <Route path='/'>
        <Redirect to={`/${galleries[0][0]}`} />
      </Route>
    </Switch>
  </Router>
)
