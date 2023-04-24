import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Card,
  CardContent,
  InputAdornment,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventIcon from "@material-ui/icons/Event";
import PhoneIcon from "@material-ui/icons/Phone";
import GroupIcon from "@material-ui/icons/Group";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import { IconButton } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import NavBar from "./NavBar";
import axios from "axios";
import Footer from "./Footer";

interface AddEmployeeProps { }

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
  },
  submitButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  cancelButton: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
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
  const [emailTouched, setEmailTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [designationTouched, setDesignationTouched] = useState(false);
  const [departmentTouched, setDepartmentTouched] = useState(false);
  const [genderTouched, setGenderTouched] = useState(false);
  const [dobTouched, setDobTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEmploy = {
      first_name: first_name,
      email: email,
      designation: designation,
      department: department,
      gender: gender,
      phone: phone,
      city: city,
      dob: dob,
    };

    try {
      const response = await axios.post("http://localhost:5000/add", newEmploy);
      console.log(`responce ${response}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const isValidEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const isValidName = (first_name: string) => {
    return first_name.trim() !== "";
  };
  const validateGender = (gender: string) => {
    return gender !== ''; 
  };
  const handleDOBBlur = () => {
    setDobTouched(true);
  };
  const isValidDOB = (dobString: string | number | Date) => {
    const dobDate = new Date(dobString);
    const currentDate = new Date();
    return dobDate <= currentDate;
  };
  return (
    <>
      <NavBar />
      <IconButton onClick={() => navigate("/")} >
      <h4>BACK</h4>
      <ArrowBackIos style={{ fontSize: 30 }} />
    </IconButton>
      <Card>
        <CardContent>
          <form className={classes.root} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} >
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={first_name}
                  onChange={(e) => setFirst_Name(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={nameTouched && !isValidName(first_name)}
                  helperText={
                    nameTouched && !isValidName(first_name)
                      ? "Please enter a  name."
                      : null
                  }
                  onBlur={() => setNameTouched(true)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  type="text"
                  id="designation"
                  name="designation"
                  label="Designation"
                  variant="outlined"
                  fullWidth
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={designationTouched && !isValidName(designation)}
                  helperText={
                    designationTouched && !isValidName(designation)
                      ? "Please enter designation."
                      : null
                  }
                  onBlur={() => setDesignationTouched(true)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  type="text"
                  id="department"
                  name="department"
                  label="Department"
                  variant="outlined"
                  fullWidth
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={departmentTouched && !isValidName(department)}
                  helperText={
                    departmentTouched && !isValidName(department)
                      ? "Please enter the department"
                      : null
                  }
                  onBlur={() => setDepartmentTouched(true)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={emailTouched && !isValidEmail()}
                  helperText={
                    emailTouched && !isValidEmail()
                      ? "Please enter a valid email address."
                      : null
                  }
                  onBlur={() => setEmailTouched(true)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  type="text"
                  id="phone"
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment> 
                    ),
                  }}
                  error={phoneTouched && !isValidName(phone)}
                  helperText={
                    phoneTouched && !isValidName(phone)
                      ? "Please enter a valid phone number"
                      : null
                  }
                  onBlur={() => setPhoneTouched(true)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  select
                  id="gender"
                  name="gender"
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessibilityIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={genderTouched && !validateGender(gender)}
                  helperText={
                    genderTouched && !validateGender(gender)
                      ? "Please select a  gender."
                      : null
                  }
                  onBlur={() => setGenderTouched(true)}
                >
                  <MenuItem value="">Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  type="text"
                  id="city"
                  name="city"
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={cityTouched && !isValidName(city)}
                  helperText={
                    cityTouched && !isValidName(city)
                      ? "Please enter City"
                      : null
                  }
                  onBlur={() => setCityTouched(true)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  required
                  type="date"
                  id="dob"
                  name="dob"
                  variant="outlined"
                  fullWidth
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  error={dobTouched && !isValidDOB(dob)}
                  helperText={
                    dobTouched && !isValidDOB(dob)
                      ? 'Please enter a valid date of birth.'
                      : null
                  }
                  onBlur={handleDOBBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid item xs={12} md={8}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.submitButton}
                  >
                    Add Employee
                  </Button>
                </Grid>
               
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
};

export default AddEmploy;
