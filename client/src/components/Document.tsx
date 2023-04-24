import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, IconButton, Input, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Typography } from "@material-ui/core";
import { CloudUpload, GetApp, InsertDriveFile } from "@material-ui/icons";
import TaB from "./TaB";
import NavBar from "./NavBar";
import Footer from "./Footer";
import React from "react";
import qs from "qs";

interface Document {
  id: number;
  Name: string;
  url: string;
  ServerRelativeUrl: string;

}
const useStyles = makeStyles({
  paper: {
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#F8F8F8',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  },
  input: {
    marginTop: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '4px',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
});


const Document: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [files, setFiles] = React.useState<Document[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.put(
        `http://localhost:5000/document/${id}`,
        formData
      );

      console.log(response.data)
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/files/${id}`
      );
      const files = response.data.files;
      console.log(response);
      console.log(typeof files);
      setFiles(files);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  React.useEffect(() => {
    fetchData();
  }, []);
  const handleDownload = async (serverRelativePath?: string) => {
    try {
      if (!serverRelativePath) {
        throw new Error("serverRelativePath parameter is required");
      }
      const response = await axios.get(
        "http://localhost:5000/document/download",
        {
          params: { serverRelativePath },
          paramsSerializer: (params) => {
            return qs.stringify(params, { encode: false });
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data]);
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute(
        "download",
        serverRelativePath.split("/").pop() || ""
      );
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredFiles = files.filter(file =>
    file.Name.toLowerCase().includes(searchText.toLowerCase())
  );
  const classes = useStyles();

  return (

    <div>
      <NavBar />
      <TaB />
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" className={classes.title}>Search Files</Typography>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name"
            fullWidth
            className={classes.input}
          />
        </Paper>
      </Container>
      {/* ... */}
      <Container maxWidth="sm">
  <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
    <Typography variant="h6"  className={classes.title} >Upload File</Typography>
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Input
          type="file"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          id="upload-file"
        />
        <label htmlFor="upload-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUpload />}
          >
            Select File
          </Button>
        </label>
        <Typography variant="subtitle1">
          {selectedFile && selectedFile.name}
        </Typography>
      </Grid>
      <Grid item>
        <Button
         className={classes.title}
          variant="contained"
          color="primary"
          startIcon={<CloudUpload />}
          onClick={handleUploadClick}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Grid>
    </Grid>
  </Paper>
</Container>


      {/* file  */}
      <Container maxWidth="sm">
  <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
    <Typography variant="h6" className={classes.title}>File List</Typography>
    <div style={{ height: "300px", overflowY: "auto" }}>
      <List>
        {filteredFiles.map((file) => (
          <ListItem key={file.id} button>
            <ListItemIcon>
              <InsertDriveFile />
            </ListItemIcon>
            <ListItemText primary={file.Name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="download"
                onClick={() => handleDownload(file.ServerRelativeUrl)}
              >
                <GetApp />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  </Paper>
</Container>


      <Footer />
    </div>
  );
};

export default Document;
