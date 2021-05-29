import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Details from './Details'


class App extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details" component={Details} />
        </Switch>
      </div>
    )
  }
}

export default App
