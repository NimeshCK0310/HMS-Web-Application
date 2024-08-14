import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function DoctorsPg() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setDoctors(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
            .then(res => {
                console.log(res);
                setDoctors(doctors.filter(doctor => doctor._id !== id));  // Update state without page reload
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar/>
            <div style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Doctors
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to="/add"
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
                                doctors.map((doctor) => (
                                    <TableRow key={doctor._id}>
                                        <TableCell>
                                            {doctor.image ? (
                                                <img 
                                                    src={`http://localhost:3001/uploads/${doctor.image}`} 
                                                    alt="Doctor" 
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                                />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{doctor.name}</TableCell>
                                        <TableCell>{doctor.spec}</TableCell>
                                        <TableCell>{doctor.description}</TableCell>
                                        <TableCell>
                                            <IconButton 
                                                color="primary" 
                                                component={Link} 
                                                to={`/updatedoctor/${doctor._id}`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="secondary" 
                                                onClick={() => handleDelete(doctor._id)}
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

export default DoctorsPg;
