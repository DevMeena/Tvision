import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Picture } from 'react-responsive-picture';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Carousel from "../cast/cast";
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext';

const ContentPage = (props) => {

    const media_type = props.match.params.media_type
    const id = props.match.params.id

    const [content, setContent] = useState([]);
    const [video, setVideo] = useState([]);
    const [credits, setCredits] = useState([]);
    const [crew, setCrew] = useState([]);
    const [genres, setGenres] = useState([]);

    const fetchData = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`
        );
    
        setContent(data);
        setGenres(data.genres);
      };
    
      const fetchVideo = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`
          )

        data.results.forEach((e)=>{
            if(e?.type === "Trailer")
            setVideo(e?.key);
        })
      };

      const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`
        );
        setCredits(data.cast);
        setCrew(data.crew);
      };

      useEffect(() => {
        fetchData();
        fetchVideo();
        fetchCredits();
        // eslint-disable-next-line
      }, []);

      // let Director;
      // let Producer;
      // let Screenwriter;

      // crew.forEach(crew => {
      //     if(crew.job === "Director") Director = crew.name
      //     if(crew.job === "Producer") Producer = crew.name
      //     if(crew.job === "Screenwriter" || crew.job === "Writer" ) Screenwriter = crew.name
      // });

      let genre = ' '
      let i = 1;
      let gen = ' '

      genres.forEach(g=>{

        if(i === 1) {
            gen = g.name
            i++
        }
        else genre = g.name
      })
      console.log(genre);

      const media_date = content.release_date || content.first_air_date
      

      const docData = {
          poster_url: "https://image.tmdb.org/t/p/w500" + content.poster_path,
          media_title: content.name || content.title,
          release_year: media_date ? media_date.substring(0, 4) : "-",
          media_rating: content.vote_average,
          media_type: media_type,
          media_id: id
      }
      
      const {currentUser} = useAuth()

      const handleAddToWatchlist = async () => {
        await updateDoc(doc(db,"users",currentUser.uid), {myList: arrayUnion(docData)},{merge: true})
        console.log("added to watchlist");
      }

    return (
        <div className="content-page-area">
            <Container className="middle-content-container">
            <Grid className="overall-container" container >

            <Grid item md={4} sm={12}>
            <Container className="poster-container" >
            <Picture className="movie-content-poster" src={"https://image.tmdb.org/t/p/w500" + content.poster_path }/>
            <Button fullWidth onClick={handleAddToWatchlist} variant="contained" className="add-to-watchlist-button" color="secondary"> Add To WatchList </Button>
            </Container>
            </Grid>

            <Grid item className="description-grid" md={8} sm={12}>
            <Container className="description-container">
            
            <div className="content-head-container" >
            <h1 className="content-title-text"> {content.name || content.title } </h1>
            <i className="content-tagline-text" > "{content.tagline ? content.tagline : content.name || content.title }" </i>
            </div>

            <Grid container>
              <Grid className="left-data" item lg={6} md={6} sm={6} xs={6}>
              <p>Rating :</p>
              </Grid>
              <Grid className="right-data" item lg={6} md={6} sm={6} xs={6}>
                <p>{content.vote_average}</p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid className="left-data" item lg={6} md={6} sm={6} xs={6}>
                <p>Release Date :</p>
              </Grid>
              <Grid className="right-data" item lg={6} md={6} sm={6} xs={6}>
                <p>{content.release_date || content.first_air_date}</p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid className="left-data" item lg={6} md={6} sm={6} xs={6}>
                <p>Runtime :</p>
              </Grid>
              <Grid className="right-data" item lg={6} md={6} sm={6} xs={6}>
                <p>{content.runtime || content.episode_run_time} mins</p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid className="left-data" item lg={6} md={6} sm={6} xs={6}>
                <p>Type :</p>
              </Grid>
              <Grid className="right-data" item lg={6} md={6} sm={6} xs={6}>
                <p>{media_type === 'tv' ? "Series/Show" : "Movie"}</p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid className="left-data" item lg={6} md={6} sm={6} xs={6}>
                <p>Genres :</p>
              </Grid>
              <Grid className="right-data" item lg={6} md={6} sm={6} xs={6}>
                <p>{gen} , {genre}</p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid className="left-data" item lg={6} md={6} sm={6} xs={6}>
                <p>Status :</p>
              </Grid>
              <Grid className="right-data" item lg={6} md={6} sm={6} xs={6}>
                <p>{content.status}</p>
              </Grid>
            </Grid>
            
            </Container>
            </Grid>

            </Grid>

            <Container>
            <br/>
            <h1  className="content-sub-title" > Plot Overview </h1>
            <br/>
            
            <p className="overview-container" >
                {content.overview}
            </p>
            </Container>

            <Container>
            <br/>
            <h1 className="content-sub-title" > Cast & Crew </h1>
            <br/>
            <Carousel id={id} media_type={media_type} />
            </Container>

            <Container>
            <br/>
            <h1 className="content-sub-title" > Official Trailer </h1>
            <br/>
            </Container>

            <Container className="video-container">

            <iframe className="video-frame" title="video-title" src={`https://www.youtube.com/embed/${video}`} frameBorder="0" allowFullScreen ></iframe>

            </Container>

            </Container>
        </div>
    )
}

export default ContentPage;
