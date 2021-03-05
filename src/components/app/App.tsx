import React from 'react'
import Login from 'components/login/login'
import Panel from 'components/panel/panel'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>  
          <Route exact path="/" component={Login} />
          <Route path="/panel" component={Panel} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
