import React from 'react'
import Grid from '@mui/material/Grid';
import { Picture } from 'react-responsive-picture';
import { Button } from '@material-ui/core';
import { doc, updateDoc, arrayRemove } from "firebase/firestore"
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';

const ListContent = (media) => {

      const delObj = {
        media_id: media.media.media_id,
        media_rating: media.media.media_rating,
        media_title: media.media.media_title,
        media_type: media.media.media_type,
        poster_url: media.media.poster_url,
        release_year: media.media.release_year
      }

      const {currentUser} = useAuth()
      const history = useHistory()



      const handleViewMedia = () => {
        history.push("/content/" + media.media.media_type + "/" + media.media.media_id)
      }

      const handleRemovefromWatchlist = async () => {
        console.log(currentUser.uid);
        await updateDoc(doc(db,"users",currentUser.uid), {myList: arrayRemove(delObj)})
      }

    return (
        <div className="table-texture" >
            <br/>

            <Grid alignItems="center" justifyContent="center" className="table-grid-holder" container>
            <Grid item className="table-movie-poster" lg={2} md={2} sm={12} xs={12}> <Picture className="table-movie-poster-img" src={media.media.poster_url} /> </Grid>
            <Grid item className="table-movie-name" lg={5} md={5} sm={12} xs={12}> <p>{media.media.media_title}</p> </Grid>
            <Grid item className="table-movie-year" lg={1} md={1} sm={12} xs={12}> <p>{media.media.release_year}</p> </Grid>
            <Grid item className="table-movie-rating" lg={1} md={1} sm={12} xs={12}> <p>{media.media.media_rating} ⭐ </p> </Grid>
            <Grid item className="table-movie-view" onClick={handleViewMedia} lg={1} md={1} sm={12} xs={12}> <Button variant='text' color="primary" > View </Button> </Grid>
            <Grid item className="table-movie-remove" onClick={handleRemovefromWatchlist} lg={1} md={1} sm={12} xs={12}> <Button variant='text' color="secondary" > Remove </Button>  </Grid>
            </Grid>

            <br/>
            <hr/>
        </div>
    )
}

export default ListContent