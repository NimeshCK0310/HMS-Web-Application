import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    TextField,
    Button,
    Typography,
    Container,
    Grid,
    Box,
    FormControl,
    IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function UpdateDoctor() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [spec, setSpec] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getdoctor/${id}`)
            .then(result => {
                setName(result.data.name);
                setSpec(result.data.spec);
                setDescription(result.data.description);
                setCurrentImage(result.data.image); // Set the current image
            })
            .catch(err => console.log(err));
    }, [id]);

    const doctorUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('spec', spec);
        formData.append('description', description);
        if (image) formData.append('image', image);

        axios.put(`http://localhost:3001/updatedoctor/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result);
            navigate('/doctors');
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar/>
            <Container maxWidth="sm">
                <form onSubmit={doctorUpdate}>
                    <Typography variant="h4" gutterBottom>
                        Update Doctor
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Specialty"
                                variant="outlined"
                                value={spec}
                                onChange={(e) => setSpec(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {currentImage && (
                                <Box mb={2}>
                                    <img 
                                        src={`http://localhost:3001/uploads/${currentImage}`} 
                                        alt="Current"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                    <Typography variant="body2">Current Image</Typography>
                                </Box>
                            )}
                            <FormControl fullWidth>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="image"
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <label htmlFor="image">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                    >
                                        <PhotoCamera />
                                    </IconButton>
                                    <Typography variant="body2">Upload Image</Typography>
                                </label>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <br></br>
            <Footer/>
        </div>
    );
}

export default UpdateDoctor;
