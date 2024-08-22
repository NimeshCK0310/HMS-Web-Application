import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate('/'); 
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container>
        {/* Left Side - Welcome Section */}
        <Grid item xs={12} md={6} sx={{ 
          background: 'linear-gradient(to right, #1e90ff, #87ceeb)',
          color: '#fff',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: '10px 0 0 10px',
        }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Hospital
          </Typography>
          <Typography variant="body1" gutterBottom>
          It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain.
          </Typography>
          <Typography variant="h6" sx={{ mt: 'auto' }}>
            Hospital
          </Typography>
        </Grid>

        {/* Right Side - Login Form */}
        <Grid item xs={12} md={6} sx={{ backgroundColor: '#fff', padding: 4, borderRadius: '0 10px 10px 0' }}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#1e90ff' }}>
              Login
            </Typography>
            <Typography variant="body2" gutterBottom>
              Welcome! Login to get amazing discounts and offers only for you.
            </Typography>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{ marginBottom: 2 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ marginBottom: 2 }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        backgroundColor: '#1e90ff',
        '&:hover': { backgroundColor: '#1c86ee' },
      }}
      onClick={handleLogin}
    >
      LOGIN
    </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2">
                  New User? Sign Up
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot your password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;