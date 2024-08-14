import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function ServicesPg() {
    const [services, setService] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/getservices')
            .then(result => setService(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteservice/${id}`)
            .then(res => {
                console.log(res);
                setDoctors(services.filter(service => service._id !== id));  // Update state without page reload
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar/>
            <div style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                   Services
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to="/addservice"
                >
                    Add +
                </Button>
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Speciality</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                services.map((service) => (
                                    <TableRow key={service._id}>
                                        <TableCell>
                                            {service.image ? (
                                                <img 
                                                    src={`http://localhost:3001/uploads/${service.image}`} 
                                                    alt="Doctor" 
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                                />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>{service.spec}</TableCell>
                                        <TableCell>{service.description}</TableCell>
                                        <TableCell>
                                            <IconButton 
                                                color="primary" 
                                                component={Link} 
                                                to={`/updateservice/${service._id}`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="secondary" 
                                                onClick={() => handleDelete(service._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Footer/>
        </div>
    );
}

export default ServicesPg;
