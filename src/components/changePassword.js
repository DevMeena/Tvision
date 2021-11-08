import * as React from 'react';
import { useState } from 'react';
import { useHistory } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Alert } from "react-bootstrap"
// import Alert from 'react-bootstrap/Alert'
import Alert from '@mui/material/Alert';

import { useAuth } from '../contexts/AuthContext'
// not using refs
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Tvision
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ChangePassword() {


    const [userData, setUserData] = useState({
      password: ''
    })

    const { currentUser, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const history = useHistory()

    // console.log();



    const handleSubmit = (event) => {

        event.preventDefault()

        const promises = []
        setLoading(true)
        setError("")
        if(userData.password) promises.push(updatePassword(userData.password))
    
        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('failed to change password')
        }).finally(() => {
            setLoading(false)
        })
        
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              {error && <Grid item xs={12}> <Alert severity="error"> {error} </Alert> </Grid>}
              {message && <Grid item xs={12}> <Alert severity="success">{message}</Alert></Grid>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  // ref={passwordRef}
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
              </Grid>
              
            </Grid>
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0 }}
            >
              Change Password
            </Button>
            <Button
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              color='secondary'
              onClick={history.goBack}
            >
              Cancel
            </Button>
            {/* <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body2">
                   Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}