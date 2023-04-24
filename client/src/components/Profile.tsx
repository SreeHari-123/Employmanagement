import { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { Button, CardMedia } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./Profile.css";
import TaB from "./TaB";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 600,
    margin: "auto",
    marginTop: 50,
    backgroundColor: "#9fa8da",
    height: 700,
  },
  media: {
    height: 140,
    width: 140,
    borderRadius: "50%",
    margin: "0 auto",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  buttonGroup: {
    display: "flex",
    marginTop: theme.spacing(1),
    justifyContent: "space-between",
  },

  icon: {
    fontSize: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  pos: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
  },
}));
const defaultImage =
  "https://static.vecteezy.com/system/resources/thumbnails/012/415/723/small/portrait-of-successful-businesswoman-free-photo.jpg";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const classes = useStyles();
  const [first_name, setFirst_name] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const [gender, setGender] = useState<any>(null);
  const [phone, setPhone] = useState<any>(null);
  const [designation, setDesignation] = useState<any>(null);
  const [department, setDepartment] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [dob, setDob] = useState<any>(null);
  const [Id, setId] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profilepic, setProfilepic] = useState<any>(null);
  const [isLoad, setLoad] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const getAllEmpoyee = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const url = `http://localhost:5000/${id}`;
      await axios.get(url, { headers }).then((response) => {
        console.log(response)
        setFirst_name(response.data.first_name);
        setEmail(response.data.email);
        setDesignation(response.data.designation);
        setPhone(response.data.phone);
        setCity(response.data.city);
        setDob(response.data.dob);
        setGender(response.data.gender);
        setId(response.data.Id);
        setDepartment(response.data.department);
        setProfilepic(response.data.image)
      });
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    const newUser = {
      first_name: first_name,
      email: email,
      department: department,
      phone: phone,
      city: city,
      designation: designation,
      dob: dob,
      gender: gender,
    };
    console.log(newUser);
    try {
      const url = `http://localhost:5000/update/${id}`;
      await axios
        .put(url, newUser, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => console.log(response));
      return window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    setProfilepic(event.target.files ? URL.createObjectURL(event.target.files[0]) : null);
  };


  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.put(`http://localhost:5000/image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)

      setProfilepic(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    return window.location.reload();
  };
  const handleDelete = async (id: string) => {
    try {
      const url = `http://localhost:5000/employ/${id}`;
      await axios.delete(url).then((response) => { });
    } catch (error) { }
    navigate("/");
  };
  useEffect(() => {
    getAllEmpoyee();
  }, []);
  return (
    <>
      <NavBar />
      <TaB />
      {isLoad ? (
        <>
          <div className="center-body">
            <div className="loader-circle-2"></div>
          </div>
        </>
      ) : (
        <>
          <Card className={classes.root}>
            <CardContent>
              <CardMedia
                className={classes.media}
                image={profilepic ? profilepic : defaultImage}
              />
              {edit ? (
                <>
                  <label htmlFor="file-upload">
                    <AddAPhotoIcon className={classes.icon} />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                  <button
                    disabled={!selectedFile}
                    onClick={handleFileUpload}

                  >
                    {selectedFile ? "Upload Selected File" : "Upload"}
                  </button>

                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      Name
                      <input
                        className="ip"
                        required
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                      />
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.title} gutterBottom>
                    Name:{first_name}
                  </Typography>
                </>
              )}
              {edit ? (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      Email
                      <input
                        className="ip"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>Email:{email}</span>
                  </Typography>
                </>
              )}

              {edit ? (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      Gender:
                      <select
                        className="ip"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>Gender: {gender}</span>
                  </Typography>
                </>
              )}

              {edit ? (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      Phone
                      <input
                        className="ip"
                        required
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>Phone:{phone}</span>
                  </Typography>
                </>
              )}

              {edit ? (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      Designation
                      <input
                        className="ip"
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      Designation:{designation}
                    </span>
                  </Typography>
                </>
              )}

              {edit ? (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      Department
                      <input
                        className="ip"
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      Department:{department}
                    </span>
                  </Typography>
                </>
              )}

              {edit ? (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      City
                      <input
                        className="ip"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>City:{city}</span>
                  </Typography>
                </>
              )}
              {edit ? (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      DOB: {dob ? new Date(dob).toLocaleDateString() : ""}
                      <input
                        className="ip"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.pos}>
                    <span className={classes.label}>
                      DOB: {dob ? new Date(dob).toLocaleDateString() : ""}
                    </span>
                  </Typography>
                </>
              )}
              <div className={classes.buttonGroup}>
                {edit ? (
                  <>
                    <Button
                      onClick={handleSave}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleEdit}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>
                  </>
                )}

                {edit ? (
                  <>
                    <Button
                      onClick={handleCancel}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleDelete(Id)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          <Footer />
        </>
      )}
    </>
  );
};
export default ProfileCard;
