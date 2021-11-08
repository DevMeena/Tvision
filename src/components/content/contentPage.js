import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Picture } from 'react-responsive-picture';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Carousel from "../cast/cast";
// import ReactTable from "react-table";  
// import Carousel from "../cast/cast";
// const media_type = 'movie'
// const id = 864873
import Table from 'react-bootstrap/Table'
import { collection, setDoc, doc, addDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext';

const ContentPage = (props) => {

    // const posterUrl = "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217";
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
        // JSON.stringify(content)
      };
    
      const fetchVideo = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`
          )
    
        // setVideo(data.results[0]?.key);
        data.results.forEach((e)=>{
            if(e?.type === "Trailer")
            setVideo(e?.key);
        })

        // JSON.stringify(video)
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

    //   console.log("content part");
    //   console.log(content);

      let Director;
      let Producer;
      let Screenwriter;

    console.log("credits");
      console.log(credits);
      console.log(credits.cast);
      console.log((content.genres));

      crew.forEach(crew => {
          if(crew.job === "Director") Director = crew.name
          if(crew.job === "Producer") Producer = crew.name
          if(crew.job === "Screenwriter" || crew.job === "Writer" ) Screenwriter = crew.name
      });
      console.log("D");
      console.log(Director);
      console.log("P");
      console.log(Producer);
      console.log("S");
      console.log(Screenwriter);

      let genre = ' '
      let i = 1;
      let gen = ' '
    //   gen = genres[0].name
      genres.forEach(g=>{
        //   genre += g.name + ' '
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

      // console.log("THIS IS DOC DATA");
      // console.log(docData);
      // console.log(currentUser.uid);

      const handleAddToWatchlist = async () => {
        await updateDoc(doc(db,"users",currentUser.uid), {myList: arrayUnion(docData)},{merge: true})
      }


    //   console.log("video part");
    //   console.log(video);
        
    //   if(content.length !== 0 && video.length !== 0)
    //   {
    //       console.log("tiru");
    //     console.log( "this is the movie name " + content.release_date);
    //     console.log(content.name);
    //   }

    return (
        <div className="content-page-area">
            {/* <h1 className="trending-text"> {content.name || content.title } </h1> */}
            <Container className="middle-content-container">
            <Grid className="overall-container" container >

            <Grid item md={4} sm={12}>
            <Container className="poster-container" >
            {/* <h1 className="content-title-text"> {content.name || content.title } </h1> */}
            <Picture className="movie-content-poster" src={"https://image.tmdb.org/t/p/w500" + content.poster_path }/>
            <Button fullWidth onClick={handleAddToWatchlist} variant="contained" className="add-to-watchlist-button" color="secondary"> Add To WatchList </Button>
            </Container>
            </Grid>

            <Grid item className="description-grid" md={8} sm={12}>
            <Container className="description-container">
            {/* <div className="info-section" > */}

            {/* </div> */}
            
            <div className="content-head-container" >
            <h1 className="content-title-text"> {content.name || content.title } </h1>
            <i className="content-tagline-text" > "{content.tagline ? content.tagline : content.name || content.title }" </i>
            </div>
            
            {/* <div className="info-section" >
            <div className="inner-info-secton">
            
            <div><span className="info-content-data-heading"> <p>Rating :</p> </span> <span className="info-content-data"> {content.vote_average} </span> </div>
            <div><span className="info-content-data-heading"> <p>Release Date :</p>  </span> <span className="info-content-data"> {content.release_date || content.first_air_date} </span></div>
            <div><span className="info-content-data-heading"> <p>Runtime :</p> </span> <span className="info-content-data"> {content.runtime || content.episode_run_time} mins </span></div>
            <div><span className="info-content-data-heading"> <p>Type :</p>  </span> <span className="info-content-data"> {media_type === 'tv' ? "Series/Show" : "Movie"} </span></div>
            <div><span className="info-content-data-heading"> <p>Genres :</p> </span> <span className="info-content-data"> {gen} , {genre} </span></div>
            <div><span className="info-content-data-heading"> <p>Status :</p> </span> <span className="info-content-data"> {content.status} </span></div>

            </div>
            </div> */}

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
            
            {/* <Container>
              <Button varient="contained" fullWidth color="secondary"> Add To WatchList </Button>
            </Container> */}

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

            <iframe className="video-frame" src={`https://www.youtube.com/embed/${video}`} frameborder="0" allowfullscreen></iframe>

            </Container>

            </Container>
        </div>
    )
}

export default ContentPage;
