import { BrowserRouter ,Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext';
import SignIn from './signin';
import SignUp from './signup';
import Dashboard from './dashboard';
import { useMemo, useState } from 'react';
import Home from './home';
import Trending from './trending/trending';
import Movies from './movies/movies';
import Series from './series/series';
import Search from './search/search';
import contentCard from "./card/contentCard"
// import { SearchProvider } from '../contexts/SearchContext';
import { SearchContext } from '../contexts/searchContext';
import { createBrowserHistory } from 'history';
import PrivateRoute from './privateRoute';
import ForgotPassword from './forgotPassword';
import ChangePassword from './changePassword'

function App() {

  const [search, setSearch] = useState('');
  const searchValue = useMemo(() => ({search,setSearch}), [search,setSearch]);
  const history = createBrowserHistory();

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter history={history}>
          <AuthProvider>
            <Switch>
              {/* <Home path="/" /> */}
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
              {/* <SearchContext.Provider value={searchValue} > */}
              <PrivateRoute path="/change-password" component={ChangePassword} />
              <PrivateRoute path="/trending" component={Dashboard} />
              <PrivateRoute path="/movies" component={Dashboard} />
              <PrivateRoute path="/series" component={Dashboard} />
                <PrivateRoute path="/search/:name" component={Dashboard} />
                <PrivateRoute path="/content/:media_type/:id" component={Dashboard} />
                <PrivateRoute path="/watchlist" component={Dashboard} />
                {/* <Route path="/content" component={Dashboard} /> */}
              {/* </SearchContext.Provider> */}
              {/* <Route path="/card" component={contentCard} /> */}
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
