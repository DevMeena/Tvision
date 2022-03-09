import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppBar from './appbar'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import '../index.css'
import Trending from './trending/trending';
import Movies from './movies/movies';
import Series from './series/series';
import Search from './search/search';
import ContentPage from './content/contentPage';
import Footer from './footer/footer';
import { SearchContext } from '../contexts/searchContext';
import { useState } from 'react';
import Watchlist from './watchlist/watchlist'

export default function Dashboard() {

  const [search, setSearch] = useState('');

    return (
        
        <div className="bg-black">
            <SearchContext.Provider value={{search, setSearch}} >
            <AppBar />
            <Container>
                <Switch>
                    <Route path="/trending" component={Trending} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/series" component={Series} />
                    <Route path="/search/:name" component={Search} />
                    <Route path="/content/:media_type/:id" component={ContentPage} />
                    <Route path="/watchlist" component={Watchlist} />
                </Switch>
            </Container>
            <Footer />
            <CssBaseline />
            </SearchContext.Provider>
        </div>
        
    )
}
