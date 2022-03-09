import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

const Footer = () => {
    return (
        <div>
            <div className="footer-area" >
            <hr className="upper-rule" />
            <Grid container spacing={2}>
                <Grid item md={9} sm={12} xs={12}>
                    <Container>
                    <h3>
                        Tvision
                    </h3>
                    <p>
                    Tvision is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows.
                    </p>
                    </Container>
                </Grid>

                <Grid item md={3} sm={12} xs={12}>

                <div className="social-icon-holder">
                <div className="social-icon-inner-holder">
                <GitHubIcon className="footer-social-icons" fontSize="medium" />
                <span> <a href="https://github.com/DevMeena" > DevMeena </a> </span>
                </div>
                <div className="social-icon-inner-holder">
                <LinkedInIcon className="footer-social-icons" fontSize="medium" />
                <span> <a href="https://in.linkedin.com/in/dev-meena-00bb7820b" > Dev Meena </a>  </span>
                </div>
                <div className="social-icon-inner-holder">
                <MailIcon className="footer-social-icons" fontSize="medium" />
                <span> <a href="mailto:2019ucp1414@mnit.ac.in" > 2019ucp1414@mnit.ac.in </a> </span>
                </div>
                </div>

                </Grid>
            </Grid>
            <br/>
            <div className="footer-copyright-text-tvision">
            <em> Copyright © {new Date().getFullYear()} by <span className="company-name-footer" >Tvision.com</span>, Inc.</em>
            </div>

            </div>
        </div>
    )
}

export default Footer
