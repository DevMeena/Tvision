import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Picture } from 'react-responsive-picture';
import { provider } from './googleProvider';
import { useAuth } from '../contexts/AuthContext'
import GoogleButton from 'react-google-button'
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom"


export const Home = () => {

    const { googleAuth } = useAuth()
    const history = useHistory()
    
    const handleOnClick = async (provider) => {
        
        try {
            await googleAuth(provider)
            history.push("/trending")
          } catch(e) {
            console.log(e);
          }
        
    }

    return (
            <Grid className="bg-home-image" container >

            <Grid item md={6} sm={6} xs={12} order={{ xs: 2, lg: 1, md: 1, sm: 2 }} >
            <Container className="black-overlay" >

                <div className="overlay-content-holder" >
                    <div>
                    <div className="brand-icon-container">
                    <LocalMoviesOutlinedIcon fontSize='large' className='home-page-brand-logo' sx={{ display: { xs: 'block', sm: 'block' }, mr: 0.7 }} />
                    </div>
                    <div className="button-containers">
                    <Button variant="contained" className="home-page-buttons sign-in-button-home" color="secondary" href="/signin"> Sign In </Button>  
                    </div>
                    <div className="button-containers">
                    <Button variant="contained" className="home-page-buttons" color="primary" href="/signup"> Sign Up </Button>
                    </div>
                    <div className="button-containers">
                    <GoogleButton variant="contained" className="home-page-buttons" onClick={() => handleOnClick(provider)} > </GoogleButton>
                    </div>
                    </div>
                </div>

            </Container>
            </Grid>

            <Grid item md={6} sm={6} xs={12} order={{ xs: 1, lg: 2, md: 2, sm: 1 }} >
            <Container className="branding-area" >
                    <div>
                    <h1 className="brand-title-home" >
                        T - Vision
                    </h1>
                    <div className="brand-subtitle-underlay-area">
                    <p className="brand-subtitle-home" >
                        Your media browsing home
                    </p>
                    </div>
                    </div>
            </Container>
            </Grid>

            <CssBaseline />
            </Grid>
    )
}

export default Home

                