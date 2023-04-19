import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, MenuItem, Card, CardContent, InputAdornment } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import PhoneIcon from '@material-ui/icons/Phone';
import GroupIcon from '@material-ui/icons/Group';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import NavBar from "./NavBar";
import axios from "axios";

interface AddEmployeeProps {
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
  },
  submitButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  cancelButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));


const AddEmploy: React.FC<AddEmployeeProps> = () => {
  const classes = useStyles();
  const [first_name, setFirst_Name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEmploy = {
      first_name:first_name,
      email: email,
      designation: designation,
      department:department,
      gender: gender,
      phone: phone,
      city: city,
      dob: dob
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/add",
        newEmploy
      );
      console.log(`responce ${response}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <>
   <NavBar/>
   <Card>
  <CardContent>
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required type="text" id="first_name" name="name" label=" Name" variant="outlined" fullWidth value={first_name}
            onChange={(e) => setFirst_Name(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField required
            type="text" id="designation" name="designation" label="Designation" variant="outlined" fullWidth value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField required type="text" id="department" name="department" label="Department" variant="outlined" fullWidth value={department}
            onChange={(e) => setDepartment(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GroupIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required type="email" id="email" name="email" label="Email" variant="outlined" fullWidth value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required type="text" id="phone" name="phone" label="Phone" variant="outlined" fullWidth value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required select id="gender" name="gender" label="Gender" variant="outlined" fullWidth value={gender}
            onChange={(e) => setGender(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessibilityIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required type="text" id="city"  name="city" label="City" variant="outlined" fullWidth  value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required  type="date" id="dob" name="dob" variant="outlined"  fullWidth  value={dob}
            onChange={(e) => setDob(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
          />
          <Grid item xs={12} md={3}>
            <Button type="submit" variant="contained" className={classes.submitButton}>
              Save
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              className={classes.cancelButton}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  </CardContent>
</Card>

   </>
  );
};

export default AddEmploy;
