import React, { Component } from 'react'
// import { Switch, Route, Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import EmailSub from './components/EmailSub/EmailSub'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={EmailSub} />
        </Switch>
      </div>
    )
  }
}

export default App