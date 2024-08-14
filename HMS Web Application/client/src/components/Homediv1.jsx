import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import back2 from '../assets/back2.jpg';
import hos4 from '../assets/hos4.png';

const HeroSection = styled(Box)({
  backgroundImage: `url(${back2})`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  textAlign: 'left',
  position: 'relative',
  marginTop: '60px',
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
 
});

const Content = styled(Box)({
  zIndex: 1,
});

const StyledButton = styled(Button)({
  backgroundColor: '#1976d2',
  borderRadius:'15px',
  color: '#fff',
  marginTop: '40px',
  '&:hover': {
    backgroundColor: '#115293',
  },
});

const ImageContainer = styled(Grid)({
  alignContent:'right',
  justifyContent:'right',
  textAlign: 'right',
});

const Homediv1 = () => {
  return (
    <HeroSection>
      <Overlay />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Content>
              <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Our Page
              </Typography>
              <Typography variant="h6" component="p" gutterBottom>
              "Your health, our priority. Book your appointment now."
              </Typography>
              <StyledButton variant="contained">Make Appointments</StyledButton>
            </Content>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageContainer>
              <img
                src={hos4}
                alt="Doctors"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </ImageContainer>
          </Grid>
        </Grid>
      </Container>
    </HeroSection>
  );
};

export default Homediv1;
