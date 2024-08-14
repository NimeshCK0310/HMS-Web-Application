import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Container, TextField, Button, Typography, Grid, Box, InputLabel, Input } from '@mui/material';

function AddService() {


    const [name, setName] = useState("");
    const [spec, setSpec] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('spec', spec);
        formData.append('description', description);
        if (image) formData.append('image', image);

        axios.post("http://localhost:3001/Addservice", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log(result);
                navigate('/servicespage');
            })
            .catch(err => console.log(err));
    }
  return (
    <div>


    	<Navbar />
            <Container maxWidth="sm" >
                <Box sx={{ mt: 10, mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Add service
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Specialty"
                                    value={spec}
                                    onChange={(e) => setSpec(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="upload-image">Upload Image</InputLabel>
                                <Input
                                    fullWidth
                                    type="file"
                                    id="upload-image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
            <Footer />
      
    </div>
  )
}

export default AddService
