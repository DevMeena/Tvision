import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Picture } from 'react-responsive-picture';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import ListContent from '../list-content/list-content'
import { currentUser, useAuth } from '../../contexts/AuthContext'
import { collection, setDoc, doc, addDoc, getDocs, getDoc } from "firebase/firestore"
import { db, firebase } from '../../firebase'


const Watchlist = () => {

    const [watchlistMovies, setwatchlistMovies] = useState([]);
    const {currentUser} = useAuth()
    const usersCollectionRef = collection(db,"users")
    const docRef = doc(db,"users",currentUser.uid)
    
    const getWatchListMovies = async () => {
        const data = await getDoc(docRef)
        if (data.exists()) {
            // console.log(data.data());
            // setwatchlistMovies([...watchlistMovies ,data.data().myList])
            setwatchlistMovies([...data.data().myList])
        } else {
            console.log("empty");
        }
    }

    useEffect(() => {
        getWatchListMovies();
    }, [watchlistMovies])
    
    console.log(currentUser.uid);
    console.log(watchlistMovies);

    // console.log(watchlistMovies.myList[0]);

    return (
        <div className="content-page-area">
            <h1 className="trending-text">  My Watchlist </h1>
           
            
            <Container className="watchlist-container">
            <hr/>


            {watchlistMovies && watchlistMovies.map((item) => (

                <ListContent
                key={item.media_id}
                media={item}
                />
            ))}


            
            </Container>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Watchlist


                    // key={item.media_id}
                // item_poster={item.poster_url}
                // item_title={item.media_title}
                // item_year={item.release_year}
                // item_rating={item.media_rating}
                // item_type={item.media_type}
                // item_id={item.media_id}

    // setwatchlistMovies(data.data().myList[0].map((doc) => ({ ...doc.data(), id: doc.id })));
    // setwatchlistMovies(watchlistMovies = data.data().myList)
    // console.log("Movies");
    // console.log(watchlistMovies);
    // console.log(watchlistMovies);
    // console.log(watchlistMovies.myList[0].poster_url);

    // const a = watchlistMovies[0]
    // const b = 
    // const c = 
    // const d = 
    // const e = 
    // const f = 

                    /* <ListContent
                // item_poster={watchlistMovies[0].poster_url}
                item_title={watchlistMovies[0].media_title}
                item_year={watchlistMovies[0].release_year}
                item_rating={watchlistMovies[0].media_rating}
                item_type={watchlistMovies[0].media_type}
                item_id={watchlistMovies[0].media_id}
                /> */

            /* watchlistMovies.map((item) => (
                <ListContent 
                    item_poster={item.poster_url}
                    item_title={item.media_title}
                    item_year={item.release_year}
                    item_rating={item.media_rating}
                    item_type={item.media_type}
                    // item_id={}
                />
            )) */