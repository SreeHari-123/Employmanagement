import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Button, CardMedia } from '@material-ui/core';
import { useParams,useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 600,
        margin: 'auto',
        marginTop: 50,
        backgroundColor: '#f5f5f5',
        height: 500
    },
    media: {
        height: 140,
        width: 140,
        borderRadius: '50%',
        margin: '0 auto',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 12,
    },
    label: {
        fontWeight: 'bold'
    }
});
const ProfileCard = () => {
    const navigate=useNavigate();
    const { id } = useParams()
    const classes = useStyles();
    const [first_name, setFirst_name] = useState<any>(null);
    const [email, setEmail] = useState<any>(null)
    const [gender, setGender] = useState<any>(null)
    const [phone, setPhone] = useState<any>(null)
    const [designation, setDesignation] = useState<any>(null)
    const [department, setDepartment] = useState<any>(null)
    const [city, setCity] = useState<any>(null)
    const [dob, setDob] = useState<any>(null)
    const[Id,setId]=useState<any>(null)
    const getAllEmpoyee = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const url = `http://localhost:5000/${id}`;
            await axios.get(url, { headers }).then((response) => {
                setFirst_name(response.data.first_name);
                setEmail(response.data.email);
                setDesignation(response.data.designation);
                setPhone(response.data.phone)
                setCity(response.data.city)
                setDob(response.data.dob)
                setGender(response.data.gender)
                setId(response.data.Id)
                setDepartment(response.data.department)

            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete=async(id:string)=>{
        try {
            const url=`http://localhost:5000/employ/${id}`
            await axios.delete(url).then((response)=>{
            })
        } catch (error) {
            
        }
     navigate('/')

    }
    useEffect(() => {
        getAllEmpoyee();
    }, []);
    return (

        <>
            <NavBar />
            <Card className={classes.root}>
                <CardContent>
                    <CardMedia
                        className={classes.media}
                        image='https://static.vecteezy.com/system/resources/thumbnails/012/415/723/small/portrait-of-successful-businesswoman-free-photo.jpg'
                    />
                    <Typography className={classes.title} gutterBottom>
                        Name:{first_name}
                    </Typography>
                    <Typography className={classes.pos}>
                        <span className={classes.label}>Email: {email}</span>
                    </Typography>
                    <Typography className={classes.pos}>
                        <span className={classes.label}>Gender: {gender}</span>
                    </Typography>
                    <Typography className={classes.pos}>
                        <span className={classes.label}>Phone: {phone}</span>
                    </Typography>
                    <Typography className={classes.pos}>
                        <span className={classes.label}>Designation: {designation}</span>
                    </Typography>
                    <Typography className={classes.pos}>
                        <span className={classes.label}>Department: {department}</span>
                    </Typography>
                    <Typography className={classes.pos}>
                        <span className={classes.label}>City: {city}</span>
                    </Typography>
                    <Typography className={classes.pos}>
                        <span className={classes.label}>
                            DOB: {dob ? new Date(dob).toLocaleDateString() : ''}
                        </span>
                    </Typography>

                    <div className={classes.buttonGroup}>
                        <Button variant="contained" color="primary">
                            Edit
                        </Button>
                        <Button variant="contained" color="secondary"
                        onClick={()=>handleDelete(Id)}
                        >
                            Delete
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
export default ProfileCard;
