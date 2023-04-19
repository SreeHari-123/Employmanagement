
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#f3e5f5",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    marginLeft:"35px",
    marginTop:"20px"
  },
  media: {
    height: 140,
    width: 140,
    borderRadius: "50%",
    margin: "0 auto",
  },
  cardHover: {
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
    },
  },
  search: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
}));

const Cards = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoad, setLoad] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const classes = useStyles();
  const navigate = useNavigate();

  const getAllEmployee = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const url = "http://localhost:5000/";
      const response = await axios.get(url, { headers });
      setUser(response.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/profile/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAddButtonClick = () => {
    navigate("/add");
  };

  const filteredUser = user
    ? user.filter((item: any) =>
        search === ""
          ? item
          : item.first_name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div>
      <TextField
        className={classes.search}
        onChange={handleSearchChange}
        label="Search employees"
        variant="outlined"
      />
      <Button
        className={classes.addButton}
        variant="contained"
        color="primary"
        onClick={handleAddButtonClick}
      >
        Add Employee
      </Button>
      <div>
      <Grid container spacing={2}>
        {filteredUser.map((data: any) => (
          <Grid item xs={12} sm={6} md={4} key={data?.Id}>
            <Card
              className={`${classes.root} ${classes.cardHover}`}
              onClick={() => handleCardClick(data?.Id)}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://static.vecteezy.com/system/resources/thumbnails/012/415/723/small/portrait-of-successful-businesswoman-free-photo.jpg"
                  title={data?.first_name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data?.first_name}
                  </Typography>
                     <Typography variant="body2" color="textSecondary" component="p">
                        {data?.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {data?.designation}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
      {isLoad && <div className="center-body">
        <div className="loader-circle-2"></div>

      </div>}
    </div>
  );
};

export default Cards;
