import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext';
import SignIn from './signin';
import SignUp from './signup';
import Dashboard from './dashboard';
import Home from './home';
import { useState } from 'react';
import { createBrowserHistory } from 'history';
import PrivateRoute from './privateRoute';
import ForgotPassword from './forgotPassword';
import ChangePassword from './changePassword'

function App() {

  const history = createBrowserHistory();

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter history={history}>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/change-password" component={ChangePassword} />
              <PrivateRoute path="/trending" component={Dashboard} />
              <PrivateRoute path="/movies" component={Dashboard} />
              <PrivateRoute path="/series" component={Dashboard} />
              <PrivateRoute path="/search/:name" component={Dashboard} />
              <PrivateRoute path="/content/:media_type/:id" component={Dashboard} />
              <PrivateRoute path="/watchlist" component={Dashboard} />
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
