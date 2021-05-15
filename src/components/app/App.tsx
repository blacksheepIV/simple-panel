import React from 'react'
import Login from 'components/login/login'
import Panel from 'components/panel/panel'
import UserDetailPage from 'components/udp/udp'
import PostListingPage from 'components/plp/plp'
import UserState from 'contexts/user-state'
import ProtectedRoute from 'contexts/routes/protectedRoute'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <UserState>
        <div className="App">
          <Switch>  
            <Route exact path="/" component={Login} />
            <ProtectedRoute path="/panel" component={Panel} />
            <ProtectedRoute path="/user/:userId" component={UserDetailPage} />
            <ProtectedRoute path="/posts/:userId" component={PostListingPage} />
          </Switch>
        </div>
      </UserState>
    </Router>
  )
}

export default App
